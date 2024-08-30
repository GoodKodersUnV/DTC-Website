import {db} from '@/lib/db';


export const addLocations = async(
    locations: {name: string, latitude: string, longitude: string}[]
) => {
    try{

        const location = await db.location.createManyAndReturn(
            {
                data: locations
            }
        );

        return location;
    }
    catch(e){
        throw new Error('Location not found');
    }
}