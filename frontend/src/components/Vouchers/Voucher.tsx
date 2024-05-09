import classNames from 'classnames/bind';
import styles from './Voucher.module.scss';
import VoucherItem from './VoucherItem';

const cx = classNames.bind(styles);

function Voucher() {
    return (
        <div className={cx('wrapper')}>
            <div>
                <h1 className={cx('heading')}>Deals</h1>
                <p className={cx('title')}>Promotions, discounts, and special offers just for you</p>
                <div className={cx('list')}>
                    <VoucherItem />
                    <VoucherItem />
                </div>
            </div>
        </div>
    );
}

export default Voucher;
