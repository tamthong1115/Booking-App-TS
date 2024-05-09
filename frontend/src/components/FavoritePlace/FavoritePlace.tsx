import FavoritePlaceItem from './FavoritePlaceItem';

function FavoritePlace() {
    return (
        <div className="mt-8">
            <div>
                <h2 className="text-2xl font-bold">Trending Destinations</h2>
                <p className="text-md">The most popular choices for travelers from Vietnam</p>
                <div className="flex flex-wrap justify-between">
                    <FavoritePlaceItem />
                    <FavoritePlaceItem />
                    <FavoritePlaceItem />
                    <FavoritePlaceItem />
                    <FavoritePlaceItem />
                    <FavoritePlaceItem />
                    <FavoritePlaceItem />
                    <FavoritePlaceItem />
                </div>
            </div>
        </div>
    );
}

export default FavoritePlace;   