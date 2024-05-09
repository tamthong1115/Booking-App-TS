function FavoritePlaceItem() {
    return (
        <div className="gird gird-cols-1 sm:gird-cols-1 md:gird-cols-2 lg:gird-cols-3 xl:gird-cols-4">
            <div className="relative mt-4">
                <img
                    className="h-48 w-full  rounded-lg object-cover lg:h-64"
                    src="https://cf.bstatic.com/xdata/images/city/600x600/688893.jpg?k=d32ef7ff94e5d02b90908214fb2476185b62339549a1bd7544612bdac51fda31&o="
                    alt=""
                />
                <div className="text-shadow-md  flex absolute left-0 right-0 top-0 m-4 font-semibold text-white">
                    <h3 className="text-xl md:text-1.8xl">Ho Chi Minh City</h3>
                    <img
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAulBMVEX///8AAAAAAAAAAAAAAAD//xT//xb/9Df/8jf/8Bn96Ub72Rn60Br4yVb4wjr3vTr1rBr0pRrxm2fwlZXxlmjymyDvjo7xliDxkxrwjhruhITtf4DreXnseHbsdXbpamrpaFDpY2vpZVDoX1/nWlroW1DoXiDnV0LmUl7mVELnUVHmUSHjTU3hSUnlQ0PfQ0PcPDzZOTnjNx7jNB7iMDDhLijWMDDgKCjUKirfIijfICDWISHPICDeFyFRpPkZAAAABXRSTlMAESIzRJTdRHwAAADMSURBVBgZrcHBSsNAFIbR7975J4GmIIIg3Unpxvd/Hd24EhELFaRNnBlnkp3NRvAc+DeGsaaYPY6seJaNR67dmuhC5LcJBAosCsaidAh3Y+af+SYzcxAWRGXonf6bQuMIVw9MUxwT55hCpDIEvYDydrbCK91OVI6wrgeG7cvJYPugDFzAMVFl7UNKvlemkuFEvNHpshnGo7wBBBjNx92Bp9O90USEF5q0GxKHr0RjjoMzGxKkDTMHoSnRJKrEIiCIrDFz41rJhrGm8Gc/DBY3JYgAKsIAAAAASUVORK5CYII="
                        alt="Vietnam"
                        className="h-6  w-6 ml-2 md:h-8 md:w-8"
                    />
                </div>
            </div>
        </div>
    );
}

export default FavoritePlaceItem;
