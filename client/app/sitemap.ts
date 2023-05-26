import { customFetch } from '@/utils/helpers';
import { MetadataRoute } from 'next';
 
export default async function sitemap() {

    const [res,data] = await customFetch('sitemap','GET')

    const reviews : [number, string][] = data.reviews

    const sitemap : MetadataRoute.Sitemap = []

    if(res.ok){
        reviews.map(review=>{
            sitemap.push({
                url: `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}review/${review[0]}/${review[1]}`,
                lastModified: new Date(),
            })
        })
    }

    return sitemap
}