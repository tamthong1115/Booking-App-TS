import classNames from 'classnames/bind';
import styles from './Place.module.scss';
import PlaceItem from './PlaceItem';

const cx = classNames.bind(styles);

function Place() {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('heading')}>Housing that guests love</h2>
            <div className={cx('body', 'gird wide')}>
                <div className={cx('row')}>
                    <PlaceItem />
                    <PlaceItem />
                    <PlaceItem />
                    <PlaceItem />
                    <PlaceItem />
                    <PlaceItem />
                    <PlaceItem />
                    <PlaceItem />
                </div>
            </div>
        </div>
    );
}

export default Place;
