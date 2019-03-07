import React from 'react';
import axios from 'axios';
import style from '../styles/hero.css';
import OrderInfo from './OrderInfo';
import ImageViewer from './ImageViewer';
import SaleBadge from './SaleBadge';
import ProductInfoMobile from './ProductInfoMobile';

class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedData: false,
      productDetails: null,
      /* Example Details
          availableColors: [1, 2, 3]
          colors: ["Cloud White", "Grey", "Ash Pearl"]
          heartToggle: false
          images: ["image url"]
          name: "Edgebounce Shoes"
          productId: 1
          retailPrice: 100
          reviewCount: 104
          reviewRating: 4
          salePrice: 50
          sizes: {
            5: 1,
            5h: 0,
          }
          tags: ["Women's", "Running"]
          thumbnails: ["image url"]
        */
      availableColorImages: []
    };
    this.fetchProduct = this.fetchProduct.bind(this);
    this.changeColor = this.changeColor.bind(this);
  }

  componentDidMount() {
    this.fetchProduct(this.props.productId);
  }

  fetchProduct(productId) {
    axios
      .get(`/abibas/product/${productId}`)
      .then(({ data }) => {
        this.setState({
          productDetails: data,
          availableColorImages: [data.images[0]],
          loadedData: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  changeColor(e) {
    e.preventDefault();
    this.fetchProductColor(Number(e.target.getAttribute('id')));
  }

  render() {
    if (this.state.loadedData) {
      let { salePrice, retailPrice, images } = this.state.productDetails;
      let sale = Math.floor(100 - (salePrice / retailPrice) * 100);
      return (
        <div className={style.background}>
          <ProductInfoMobile details={this.state.productDetails} />
          <div className={style.container}>
            <ImageViewer images={images} />
            <SaleBadge sale={sale} />
            <OrderInfo
              details={this.state.productDetails}
              availableColorImages={this.state.availableColorImages}
            />
            <div className={style.bar} />
          </div>
          <div className={style.background} />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Hero;
