import EmptyData from '@/components/fallback/emptydata';
import React from 'react';

interface MapData {
    location: string;
}

interface MapDataProps {
    data: MapData;
}

const Map: React.FC<MapDataProps> = ({ data }) => {
    return (
        <div className="w-full rounded-xl h-[450px] py-8">
            {data.location ? (
                <iframe
                    src={data.location}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className='rounded-xl border-2 border-gray-700'
                />
            ) : (
                <div className='flex justify-center items-center w-full rounded-xl h-[450px] bg-gray-300'>
                    <EmptyData fallbackname="Location" />
                </div>
            )}
        </div>
    );
};

export default Map;
