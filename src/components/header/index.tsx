import { useGlobalContext } from '@/components';

export const Header: React.FC = () => {
    const globalData = useGlobalContext();
    return (
        <div className='bg-gray-200 p-2 rounded'>
            <p>Header component</p>
            <p>This is global data</p>
            <p>{JSON.stringify(globalData.user)}</p>
        </div>
    );
};
