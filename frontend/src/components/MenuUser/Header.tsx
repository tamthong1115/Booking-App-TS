import classNames from 'classnames/bind';
import styles from './MenuUser.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Header({ title, onBack }) {
    return (
        <header className={cx('header')}>
            <button className={cx('btn')} onClick={onBack}>
                <FontAwesomeIcon className={cx('icon')} icon={faChevronLeft} />
            </button>
            <h3 className={cx('header-title')}>{title}</h3>
        </header>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default Header;
