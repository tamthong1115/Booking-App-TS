import { Wrapper as PopperWrapper } from '../Popper';
import classNames from 'classnames/bind';
import styles from './Place.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function PlaceItem() {
    return (
        <div className={cx('col', 'l-3', 'm-4', 'c-6')}>
            <div className={cx('place-item')}>
                <PopperWrapper>
                    <img
                        className={cx('place-img')}
                        src="https://cf.bstatic.com/xdata/images/hotel/square600/121402222.webp?k=f7f266ab09f90ddea4464309eca14d79429afe4218ced6887cb52f82c42c03dc&o="
                        alt="Ảnh phòng"
                    />
                    <div className={cx('place-info')}>
                        <div className={cx('place-name')}>
                            <h4 className={cx('name')}>Epoques Apartments by AdrezEpoques Apartments by Adrez</h4>
                            <p className={cx('description')}>Khu Prague 01, Cộng hoà Séc, Praha 1</p>
                        </div>
                        <h4 className={cx('place-price')}>$ 2.154</h4>
                        <div className={cx('place-like')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faHeart} />
                            <div className={cx('rating')}>
                                <div className={cx('point')}>8.7</div>
                                <p> 582 evaluate</p>
                            </div>
                        </div>
                    </div>
                </PopperWrapper>
                <div className={cx('sale-off')}>
                    <span className={cx('percent')}>47%</span>
                    <span className={cx('label')}>Discount</span>
                </div>
            </div>
        </div>
    );
}

export default PlaceItem;
