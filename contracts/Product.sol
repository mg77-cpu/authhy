//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Product {

    uint256 productsCount;

    //product added event
    event ProductAdded(
        string productId,
        string name,
        uint256 manufacturedDate,
        uint256 expiryDate,
        string manufacturer
    );

    //product not added event
    event ProductNotAdded(string productId, string reason);

    ///function that stores product details in a struct
    struct AddProduct {
        string name;
        string productId;
        uint256 manufacturedDate;
        uint256 expiryDate;
        string manufacturer;
    }

    struct AddProducts {
        string transactionHash;
        string name;
        string productId;
        uint256 manufacturedDate;
        uint256 expiryDate;
        string manufacturer;
    }

    mapping(string => AddProduct) public products; // Mapping from product ID to Product

    function addProduct(
        string memory _productId,
        string memory _name,
        uint256 _manufacturedDate,
        uint256 _expiryDate,
        string memory _manufacturer
    ) public {
        require(
            products[_productId].manufacturedDate == 0,
            "Product already exists"
        );
        require(
            _manufacturedDate <= block.timestamp,
            "Manufactured date cannot be in the future"
        );
        require(
            _expiryDate > _manufacturedDate,
            "Expiry date must be after manufactured date"
        );
        products[_productId] = AddProduct(
            _name,
            _productId,
            _manufacturedDate,
            _expiryDate,
            _manufacturer
        );
        emit ProductAdded(
            _productId,
            _name,
            _manufacturedDate,
            _expiryDate,
            _manufacturer
        );
    }

    //add product with conditins
    function addProductWithCheck(
        string memory _name,
        string memory _productId,
        uint256 _manufacturedDate,
        uint256 _expiryDate,
        string memory _manufacturer
    ) public {
        if (
            products[_productId].manufacturedDate == 0 &&
            _manufacturedDate <= block.timestamp &&
            _expiryDate > _manufacturedDate
        ) {
            products[_productId] = AddProduct(
                _name,
                _productId,
                _manufacturedDate,
                _expiryDate,
                _manufacturer
            );
            productsCount += 1;

            emit ProductAdded(
                _productId,
                _name,
                _manufacturedDate,
                _expiryDate,
                _manufacturer
            );
        } else {
            string memory reason;
            if (products[_productId].manufacturedDate != 0) {
                reason = "Product already exists";
            } else if (_manufacturedDate > block.timestamp) {
                reason = "Manufactured date cannot be in the future";
            } else if (_expiryDate <= _manufacturedDate) {
                reason = "Expiry date must be after manufactured date";
            } else {
                reason = "Invalid input";
            }
            emit ProductNotAdded(_productId, reason);
            
        }
    }

    //event  to emit when product is not found
    event ProductNotFound(string productId, string reason);

    mapping(string => AddProducts) public transactionToProduct;

    //function that creates a prodcut struct using transaction hash
    function mapTransactionToProduct(
        string memory _transactionHash,
        string memory _name,
        string memory _productId,
        uint256 _manufacturedDate,
        uint256 _expiryDate,
        string memory _manufacturer
    ) public {
        if (
            products[_transactionHash].manufacturedDate == 0 &&
            _manufacturedDate <= block.timestamp &&
            _expiryDate > _manufacturedDate
        ) {
            transactionToProduct[_transactionHash] = AddProducts(
                _transactionHash,
                _name,
                _productId,
                _manufacturedDate,
                _expiryDate,
                _manufacturer
            );
        } else {
            revert("Conditions not satisfied");
        }
    }

    //function that searches the database for products
    function getProductInfo(
        string memory _productId
    ) public view returns (AddProduct memory) {
        return products[_productId];
    }

    event TransactionNotFound(string reason);

    //function that retrieves a product struct mapped to a transaction hash
    function getProductByHash(
    string memory _transactionHash
) public returns (AddProducts memory) {
    // Check if the product exists
    if (transactionToProduct[_transactionHash].manufacturedDate == 0) {
        emit TransactionNotFound("Product does not exist in the system");
        // Optionally, you can revert the transaction or return a default value
        // revert("Product does not exist in the system"); // Uncomment if you want to revert
        // Return an empty AddProducts struct if the product is not found
        return AddProducts("", "", "", 0, 0, ""); // Returning an empty struct
    } else {
        return transactionToProduct[_transactionHash];
    }
}

    function getTotalProducts() public view returns (uint256) {
        return productsCount;
    }

}
