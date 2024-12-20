import React from "react";
import { Link } from "react-router-dom";

const SideBar = ({
  showFirmHandler,
  showProductHandler,
  showAllProductsHandler,
  showFirmTitle,
  showCurrentHandler,
  showHistoryHandler
}) => {
  return (
    <div className="sideBarSection">
      <ul>
        {showFirmTitle ? <li onClick={showFirmHandler}>Add Firm</li> : "" }
        <li onClick={showProductHandler}>Add Product</li>
        <li onClick={showAllProductsHandler}>All Products</li>
        <li onClick={showCurrentHandler}>ActiveOrders</li>
        <li onClick={showHistoryHandler}>OrderHistory</li>
        <li>
        <Link to='/dine'>
             DineOut</Link></li>
             <li>
             <Link to='/late'>
             12PmFoods</Link></li>
      </ul>
    </div>
  );
};

export default SideBar;
