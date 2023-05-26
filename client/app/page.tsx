import Transition from './components/Transition'
import Slider from './components/Slider'


export const metadata = {
    title: 'Gamon | movie review'
}

export default function Index() {

    return (
        <Transition>
            <div className='flex lg:flex-row md:flex-row flex-col items-center justify-center p-4 h-full'>

                
                <div className='break-words w-full lg:w-1/2 md:w-1/2  pb-5 md:pb-0'>
                    <p className='lg:text-[80px] text-[35px] text-white '>
                        Welcome to Gamon
                    </p>
                    <p className='lg:text-[50px] text-[20px] text-gray-300 ps-5'>
                        A place to review movies and enjoy cinema
                    </p>
                </div>

                <div className='w-full lg:w-1/2 md:w-1/2'>
                    <Slider />
                </div>



            </div>
        </Transition>
    )
}
