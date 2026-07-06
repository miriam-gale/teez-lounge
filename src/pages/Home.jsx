import Hero from '../components/sections/Hero'
import CustomerFavourites from '../components/sections/CustomerFavourites'
import WhyChoose from '../components/sections/WhyChoose'
import AboutPreview from '../components/sections/AboutPreview'
import GalleryPreview from '../components/sections/GalleryPreview'
import ReviewsPreview from '../components/sections/ReviewsPreview'
import ContactSection from '../components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <Hero />
      <CustomerFavourites />
      <WhyChoose />
      <AboutPreview />
      <GalleryPreview />
      <ReviewsPreview />
      <ContactSection />
    </>
  )
}
