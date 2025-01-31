import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './index.css';

import { Loader } from '../loader';

interface IProps {
    isLoading: boolean;
    isSearchAvailable?: boolean;
    actualLimit: number;
    total: number;
    error: string | undefined;
    loadCallback: (searchTerm: string, limit: number, skip: number) => void;
}

export const ListView: FC<PropsWithChildren<IProps>> = ({
                                                            isLoading,
                                                            isSearchAvailable = true,
                                                            actualLimit,
                                                            total,
                                                            error,
                                                            loadCallback,
                                                            children,
                                                        }) => {
    const limit = 5; // TODO: we can create control to change this value

    // SearchParams and values
    const [searchParams, setSearchParams] = useSearchParams({ searchTerm: '', page: '0'  });

    const searchTerm = searchParams.get('searchTerm') || '';
    const currentPage = Number(searchParams.get('page') || '0');

    const [inputSearchTerm, setInputSearchTerm] = useState<string>(searchTerm);

    useEffect(() => {
        loadCallback(searchTerm, limit, currentPage * limit);
    }, [loadCallback, searchTerm, limit, currentPage]);

    const onPrevClick = () => {
        if (currentPage >= 1) {
            const newSearchParams = new URLSearchParams(searchParams);

            newSearchParams.set('page', (currentPage - 1).toString());
            newSearchParams.set('searchTerm', searchTerm);

            setSearchParams(newSearchParams);
            setInputSearchTerm(searchTerm);
        }
    };

    const onNextClick = () => {
        const newSearchParams = new URLSearchParams(searchParams);

        newSearchParams.set('page', (currentPage + 1).toString());
        newSearchParams.set('searchTerm', searchTerm);

        setSearchParams(newSearchParams);
        setInputSearchTerm(searchTerm);
    };

    const onSearchClick = () => {
        const newSearchParams = new URLSearchParams(searchParams);

        newSearchParams.set('page', '0');
        newSearchParams.set('searchTerm', inputSearchTerm);

        setSearchParams (newSearchParams);
    };

    const onSearchResetClick = () => {
        setSearchParams ({
            page: '0',
            searchTerm: '',
        });
        setInputSearchTerm('');
    };

    return (
        <div className='list-view'>
            {
                isSearchAvailable &&
                <div className='list-view__search'>
                    <input
                        id='searchTerm'
                        className='input-mui'
                        value={inputSearchTerm}
                        onChange={({ target }) => setInputSearchTerm(target.value)}
                    />
                    <button className='btn-mui' onClick={onSearchClick}>Шукати</button>
                    <button className='btn-mui' onClick={onSearchResetClick}>Скинути</button>
                </div>
            }

            <div className='list-view__items'>
                {children}
            </div>

            <div className='list-view__navigation'>
                <button
                    className='btn-mui'
                    onClick={onPrevClick}
                    disabled={currentPage === 0}
                >
                    Попередня сторінка
                </button>
                <button
                    className='btn-mui'
                    onClick={onNextClick}
                    disabled={(currentPage * limit + actualLimit) >= total}
                >
                    Наступна сторінка
                </button>
            </div>
            <Loader isLoading={isLoading} />
            {
                typeof error === 'string' &&
                <div className='list-view__error'>
                    <span>{error}</span>
                </div>
            }
        </div>
    );
};