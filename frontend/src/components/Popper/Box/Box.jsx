import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
//
import styles from './Box.module.scss';
import { Wrapper as PopperWrapper } from '../index';
import Button from '../../Button/';

const cx = classNames.bind(styles);

function Box({ children }) {
    const renderResult = () => {
        return (
            <PopperWrapper>
                <div className={cx('wrapper')}>
                    <div>
                        <div className={cx('item')}>
                            <h4>Người lớn</h4>
                            <div className={cx('count')}>
                                <Button className={cx('symbol')}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </Button>
                                <div className={cx('amount')}>2</div>
                                <Button className={cx('symbol')}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </Button>
                            </div>
                        </div>
                        <div className={cx('item')}>
                            <h4>Trẻ em</h4>
                            <div className={cx('count')}>
                                <Button className={cx('symbol')}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </Button>
                                <div className={cx('amount')}>0</div>
                                <Button className={cx('symbol')}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </Button>
                            </div>
                        </div>
                        <div className={cx('item')}>
                            <h4>Phòng</h4>
                            <div className={cx('count')}>
                                <Button className={cx('symbol')}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </Button>
                                <div className={cx('amount')}>1</div>
                                <Button className={cx('symbol')}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Button className={cx('btn')}>Xong</Button>
                </div>
            </PopperWrapper>
        );
    };

    return (
        <div>
            <Tippy delay={[0, 300]} offset={[6, 8]} interactive placement="bottom" render={renderResult}>
                <div>{children}</div>
            </Tippy>
        </div>
    );
}

export default Box;
