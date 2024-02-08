import { createContext, useContext } from 'react';
import { get } from 'lodash-es';

export const defaultGlobalData = {} as any;

export const GlobalContext = createContext(defaultGlobalData);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider: React.FC<React.PropsWithChildren<{ value: any }>> = (props) => {
    const globalData = get(props.value, 'globalProps', {});
    return <GlobalContext.Provider value={globalData}>{props.children}</GlobalContext.Provider>;
};
