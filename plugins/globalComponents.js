import Vue from 'vue'

// HEADERS
import Header from "@/components/headers/Header"
import SmallHeader from "@/components/headers/SmallHeader"
import VideoHeader from "@/components/headers/VideoHeader"
import ContactHeader from "@/components/headers/ContactHeader"
// FOOTER
import Footer from "@/components/footers/Footer"

// WRAPPERS 
import Wrapper from "@/components/wrappers/Wrapper"
import Preview from "@/components/preview/Preview"
import Accordion from "@/components/accordion/Accordion"

// TEXT AND IMAGE
import TextAndLeftImage from "@/components/textAndImage/TextAndLeftImage"
import TextAndRightImage from "@/components/textAndImage/TextAndRightImage"

import TextComponent from "@/components/textComponent/TextComponent"

// CONTACT
import ContactComponent from "@/components/contact/ContactComponent"


import Swiper from "@/components/swiper/Swiper";

//FILTER COMPONENTS
import FilterCheckbox from "@/components/filter/FilterCheckbox"

const components = {
    Header,
    SmallHeader,
    VideoHeader,
    ContactHeader,
    Footer,
    Wrapper,
    Preview,
    Accordion,
    Swiper,
    TextAndLeftImage,
    TextAndRightImage,
    TextComponent,
    FilterCheckbox,
    ContactComponent
}

Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
})