
import Transition from "../components/Transition";
import ReviewsList from "./components/ReviewsList";

export const metadata = {
    title: 'Movie reviews list',
  }
  


export default function ReviewsListPage() {
    return (
        <>
            <Transition>
                <ReviewsList />
            </Transition>
        </>
    )
}
