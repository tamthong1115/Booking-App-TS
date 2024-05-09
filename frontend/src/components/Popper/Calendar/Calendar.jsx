import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
//
import styles from './Calendar.module.scss';
import { Wrapper as PopperWrapper } from '../index';
import Button from '../../Button/';

const cx = classNames.bind(styles);

function Calendar({ children }) {
    const renderResult = () => {
        const classNames = cx({
            active_cell: false,
            cell: true,
        });

        return (
            <PopperWrapper>
                <div className={cx('inner')}>
                    <h3 className={cx('heading')}>Lịch</h3>
                    <div className={cx('body')}>
                        <Button className={cx('left-btn', 'btn')}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </Button>
                        <Button className={cx('right-btn', 'btn')}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </Button>
                        <div className={cx('calendar-table')}>
                            <div className={cx('popper')}>
                                <h3 className={cx('title')}>tháng 3 2024</h3>
                                <table className={cx('table')}>
                                    <thead>
                                        <tr>
                                            <th>T2</th>
                                            <th>T3</th>
                                            <th>T4</th>
                                            <th>T5</th>
                                            <th>T6</th>
                                            <th>T7</th>
                                            <th>CN</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className={classNames}>1</td>
                                            <td className={classNames}>2</td>
                                            <td className={classNames}>3</td>
                                            <td className={classNames}>4</td>
                                            <td className={classNames}>5</td>
                                            <td className={classNames}>6</td>
                                            <td className={classNames}>7</td>
                                        </tr>
                                        <tr>
                                            <td className={classNames}>8</td>
                                            <td className={classNames}>9</td>
                                            <td className={classNames}>10</td>
                                            <td className={classNames}>11</td>
                                            <td className={classNames}>12</td>
                                            <td className={classNames}>13</td>
                                            <td className={classNames}>14</td>
                                        </tr>
                                        <tr>
                                            <td className={classNames}>15</td>
                                            <td className={classNames}>16</td>
                                            <td className={classNames}>17</td>
                                            <td className={classNames}>18</td>
                                            <td className={classNames}>19</td>
                                            <td className={classNames}>20</td>
                                            <td className={classNames}>21</td>
                                        </tr>
                                        <tr>
                                            <td className={classNames}>22</td>
                                            <td className={classNames}>23</td>
                                            <td className={classNames}>24</td>
                                            <td className={classNames}>25</td>
                                            <td className={classNames}>26</td>
                                            <td className={classNames}>27</td>
                                            <td className={classNames}>28</td>
                                        </tr>
                                        <tr>
                                            <td className={classNames}>29</td>
                                            <td className={classNames}>30</td>
                                            <td className={classNames}></td>
                                            <td className={classNames}></td>
                                            <td className={classNames}></td>
                                            <td className={classNames}></td>
                                            <td className={classNames}></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={cx('popper')}>
                                <h3 className={cx('title')}>tháng 3 2024</h3>
                                <table className={cx('table')}>
                                    <thead>
                                        <tr>
                                            <th>T2</th>
                                            <th>T3</th>
                                            <th>T4</th>
                                            <th>T5</th>
                                            <th>T6</th>
                                            <th>T7</th>
                                            <th>CN</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className={classNames}>1</td>
                                            <td className={classNames}>2</td>
                                            <td className={classNames}>3</td>
                                            <td className={classNames}>4</td>
                                            <td className={classNames}>5</td>
                                            <td className={classNames}>6</td>
                                            <td className={classNames}>7</td>
                                        </tr>
                                        <tr>
                                            <td className={classNames}>8</td>
                                            <td className={classNames}>9</td>
                                            <td className={classNames}>10</td>
                                            <td className={classNames}>11</td>
                                            <td className={classNames}>12</td>
                                            <td className={classNames}>13</td>
                                            <td className={classNames}>14</td>
                                        </tr>
                                        <tr>
                                            <td className={classNames}>15</td>
                                            <td className={classNames}>16</td>
                                            <td className={classNames}>17</td>
                                            <td className={classNames}>18</td>
                                            <td className={classNames}>19</td>
                                            <td className={classNames}>20</td>
                                            <td className={classNames}>21</td>
                                        </tr>
                                        <tr>
                                            <td className={classNames}>22</td>
                                            <td className={classNames}>23</td>
                                            <td className={classNames}>24</td>
                                            <td className={classNames}>25</td>
                                            <td className={classNames}>26</td>
                                            <td className={classNames}>27</td>
                                            <td className={classNames}>28</td>
                                        </tr>
                                        <tr>
                                            <td className={classNames}>29</td>
                                            <td className={classNames}>30</td>
                                            <td className={classNames}></td>
                                            <td className={classNames}></td>
                                            <td className={classNames}></td>
                                            <td className={classNames}></td>
                                            <td className={classNames}></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className={cx('footer')}>
                        <p className={cx('footer__title')}>Chọn ngày và tháng</p>
                        <Button
                            className={cx('choose-btn', {
                                active: false,
                            })}
                        >
                            Chọn
                        </Button>
                    </div>
                </div>
            </PopperWrapper>
        );
    };

    return (
        <div>
            <Tippy delay={[0, 300]} placement="bottom" offset={[190, 6]} interactive render={renderResult}>
                <div className={cx('wrapper')}>{children}</div>
            </Tippy>
        </div>
    );
}

export default Calendar;
