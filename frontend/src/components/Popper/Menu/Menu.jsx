import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
//
import { Wrapper as PopperWrapper } from '../index';
import styles from './Menu.module.scss';
import MenuItems from './MenuItems';

const cx = classNames.bind(styles);

function Menu({ data, children, showResult = false, searchResults }) {
    const renderItems = () => {
        return data.map((item) => {
            return <MenuItems place={item} key={item.id} />;
        });
    };

    console.log(showResult)
    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                <div className={cx('menu-body')}> {renderItems()}</div>
            </PopperWrapper>
        </div>
    );

    return (
        <div>
            <Tippy visible={showResult && searchResults.length > 0}  delay={[0, 300]} interactive offset={[10, 16]} placement="bottom" render={renderResult}>
                <div>{children}</div>
            </Tippy>
        </div>
    );
}

export default Menu;
