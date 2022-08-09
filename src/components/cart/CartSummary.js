import React, { Component } from "react";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import { Link } from "react-router-dom";
import alertify from "alertifyjs";

class CartSummary extends Component {
  removeFromCart(product) {
    this.props.actions.removeFromCart(product);
    alertify.error(product.productName + " removed from cart");
  }

  renderEmpty() {
    return (
      <NavItem>
        <NavLink>Cart is Empty</NavLink>
      </NavItem>
    );
  }

  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Cart
        </DropdownToggle>
        <DropdownMenu end>
          {this.props.cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}>
              <Badge
                color="danger"
                onClick={() => this.removeFromCart(cartItem.product)}
              >
                -
              </Badge>{" "}
              {cartItem.product.productName}{" "}
              <Badge color="info">{cartItem.quantity}</Badge>
            </DropdownItem>
          ))}

          <DropdownItem divider />
          <DropdownItem>
            <Link to={"/cart"}>Go to cart</Link>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
  render() {
    return (
      <div>
        {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
    },
  };
}

function mapStateToProps(state) {
  return {
    cart: state.cartReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
