import {db} from '@/lib/db';


export const addLocations = async(
    locations: {name: string, latitude: string, longitude: string}
) => {
    try{
        const location = await db.location.create(
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


export const getAllLocations = async() => {
    try{
        const locations = await db.location.findMany();

        return locations;
    }
    catch(e){
        throw new Error('Location not found');
    }
}

export const getLocation = async(id: string) => {
    try{
        const location = await db.location.findUnique({
            where: {
                id
            }
        });

        return location;
    }
    catch(e){
        throw new Error('Location not found');
    }
}