import { IoIosCloseCircle } from "react-icons/io";
import { RiLoader4Fill } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import HeadlessTippy from '@tippyjs/react/headless';
import { useState, useRef, useEffect, memo } from "react";

import * as ProductServices from '~/services/ProductServices';
import { useDebounce } from "@uidotdev/usehooks";
import { Wrapper as WrapperPopper } from '~/components/core/Popper';
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import ProductSearchItem from "~/components/ProductSearchItem";

const cx = classNames.bind(styles);

function Search() {

    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const searchRef = useRef(null);
    const debounced = useDebounce(searchValue, 500);

    const handleSearch = () => {

    }

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await ProductServices.search(debounced);


            setSearchResult(result);
            if (result) {
                setVisible(true);
            }
            setLoading(false);
        };
        fetchApi();

    }, [debounced]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        searchRef.current.focus();
    };

    const handleHideResult = () => {
        setVisible(false);
    };

    return (
        <div className={cx('wrapper')}>
            <HeadlessTippy
                visible={visible && searchResult.length > 0}
                interactive={true}
                onClickOutside={handleHideResult}
                offset={[-9999, 12]}
                maxWidth='none'
                render={
                    attrs => (
                        <div {...attrs} className={cx('search-results')} tabIndex="-1">
                            <WrapperPopper>
                                
                                <h4 className={cx('search-title')}>Results</h4>

                                {searchResult && searchResult.map((result, index) => (
                                    <ProductSearchItem key={index} data={result} />
                                ))}

                                <div className={cx('last-item')}>
                                    <p className={cx('last-item-title')}>
                                        Xem tất cả kết quả dành cho "{searchValue}"
                                    </p>
                                </div>
                            </WrapperPopper>
                        </div>

                    )
                }>
                <div className={cx('search')} >
                    <input
                        ref={searchRef}
                        type="text" placeholder="Search"
                        spellCheck={false}
                        value={searchValue}
                        onChange={(e) => { setSearchValue(e.target.value) }}
                        onFocus={handleSearch}
                    />
                    <button type="button" className={cx('search-action')}>
                        {!!searchValue && !loading && (
                            <IoIosCloseCircle className={cx('clear')}
                                onClick={handleClear}
                            />
                        )}
                    </button>
                    {/* loading */}
                    {loading && <RiLoader4Fill className={cx('loading')} />}
                    <button className={cx('search-btn')} onClick={() => handleSearch()}>
                        <BiSearch />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default memo(Search);