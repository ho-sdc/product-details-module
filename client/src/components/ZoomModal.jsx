import React from 'react';
import style from '../styles/zoomModal.css';
import SkyLight from 'react-skylight';

class ZoomModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    }
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  componentDidMount(props) {
    this.setState({
      index: this.props.imageIndex
    });
  }

  next() {
    let last = this.props.images.length - 1;
    if (this.state.index < last) {
      this.setState({
        index: this.state.index + 1
      });
    }
  }

  previous() {
    if (this.state.index > 0) {
      this.setState({
        index: this.state.index - 1
      });
    }
  }

  render() {
    let { images, imageIndex } = this.props;

    return (
      <div className={style.container}>
        <div className={style.carousel} style={{transform:`translate(-${this.state.index * 100}vw, 0)`}}>
            {images.map((image, key) => {
              return (
                <div key={key} className={style.carouselEntry}>
                  <div className={style.imageWrapper}>
                    <img className={style.image} src={image} />
                  </div>
                </div>
              );
            })}
        </div>
        <div className={style.leftArrow} onClick={this.previous}>&#x027F5;</div>
        <div className={style.rightArrow} onClick={this.next}>&#x027F6;</div>
      </div>
    );
  }
}

export default ZoomModal;