import classNames from 'classnames/bind';
import styles from './Voucher.module.scss';
import Buttons from '../Buttons';

const cx = classNames.bind(styles);
function VoucherItem() {
    return (
        <div className={cx('item')}>
            <img
                className={cx('img-voucher')}
                src="https://th.bing.com/th/id/R.b390ec67ffec4a056688439ff054f1ab?rik=q%2bn51y72%2bLPh3Q&pid=ImgRaw&r=0"
                alt=""
            />
            <div className={cx('info')}>
                <div>
                    <h3 className={cx('heading')}>New Year, New Journey</h3>
                    <p className={cx('title')}>Save up to 15% when you book and stay before 4/1/2024</p>
                </div>
                <Buttons className={cx('btn')}>
                    Find Early 2024 Deals
                </Buttons>
            </div>
        </div>
    );
}

export default VoucherItem;


