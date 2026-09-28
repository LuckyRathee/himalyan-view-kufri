import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  ConciergeBell,
  Expand,
  Flame,
  Heater,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mountain,
  Phone,
  Send,
  ShieldCheck,
  Sunrise,
  Tv,
  Users,
  UtensilsCrossed,
  Wifi,
  X,
} from 'lucide-react'

/* ==========================================================================
   1. SITE CONFIG — edit these values before going live
   ========================================================================== */

const HOTEL = {
  name: 'Himalyan View Kufri',
  shortName: 'Himalyan View',
  tagline: 'Kufri · Shimla · Himachal Pradesh',
  // TODO: confirm email and address
  phone: '+91 99154 94146',
  whatsapp: '919915494146', // digits only, with country code — used for wa.me links
  email: 'stay@himalyanviewkufri.com',
  address: 'Himalyan View Kufri, Kufri, Shimla, Himachal Pradesh 171012, India',
  mapQuery: 'Kufri, Himachal Pradesh',
  checkIn: '12:00 PM',
  checkOut: '11:00 AM',
  social: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
  },
  // Optional: a form backend (Formspree, Web3Forms, your own API…).
  // When empty, the inquiry form opens the guest's email app pre-filled instead.
  formEndpoint: '',
}

/* ==========================================================================
   2. IMAGE SLOTS
   The four primary slots are keyed by their placeholder labels. To swap a
   photo, drop the file in /public/images and change `src` below.
   ========================================================================== */

const IMAGES = {
  '[IMAGE_PLACEHOLDER_1_HERO_VIEW]': {
    src: '/images/hero-balcony-view.jpg',
    width: 1280,
    height: 853,
    alt: 'Private balcony at Himalyan View Kufri overlooking pine-covered Himalayan hills and the Shimla valley on a clear morning',
  },
  '[IMAGE_PLACEHOLDER_2_PROPERTY_EXTERNAL]': {
    src: '/images/exterior.jpg',
    width: 1060,
    height: 1400,
    alt: 'Exterior of Himalyan View Kufri hotel with wraparound balconies, landscaped gardens and deodar trees in Kufri, Himachal Pradesh',
  },
  '[IMAGE_PLACEHOLDER_3_DELUXE_ROOM]': {
    src: '/images/deluxe-room.jpg',
    width: 1280,
    height: 853,
    alt: 'Spacious deluxe room at Himalyan View Kufri with king bed, warm pine-wood panelling and hardwood floors',
  },
  '[IMAGE_PLACEHOLDER_4_DINING_OR_BALCONY]': {
    src: '/images/dining.jpg',
    width: 1280,
    height: 853,
    alt: 'In-house restaurant at Himalyan View Kufri with solid-wood dining tables, carved screens and a timber ceiling',
  },
}

const PHOTOS = {
  valleyClouds: {
    src: '/images/valley-clouds.jpg',
    width: 1599,
    height: 899,
    alt: 'Monsoon clouds drifting through the green Kufri valley seen from the hotel garden',
  },
  courtyard: {
    src: '/images/courtyard.jpg',
    width: 1060,
    height: 780,
    alt: 'Checkered sit-out terrace with garden chairs and sweeping views of the Himalayan foothills near Kufri',
  },
  stairway: {
    src: '/images/sunlit-stairway.jpg',
    width: 1280,
    height: 853,
    alt: 'Sunlit garden stairway with white picket fence and lamp posts overlooking layered Himachal mountain ranges',
  },
  mistyWalkway: {
    src: '/images/misty-walkway.jpg',
    width: 1599,
    height: 899,
    alt: 'Garden walkway at Himalyan View Kufri with clouds rolling over the valley below',
  },
  terrace: {
    src: '/images/terrace-seating.jpg',
    width: 576,
    height: 1280,
    alt: 'Rooftop terrace with rattan chairs and a glass table surrounded by apple orchards in Kufri',
  },
  balconyEvening: {
    src: '/images/balcony-evening.jpg',
    width: 960,
    height: 1280,
    alt: 'Room balcony at night with seating and twinkling lights of the Shimla hills in the distance',
  },
  valleyRoom: {
    src: '/images/deluxe-valley-room.jpg',
    width: 1280,
    height: 853,
    alt: 'Premium balcony room with king bed, pine-wood feature pillar and wall-mounted TV at Himalyan View Kufri',
  },
  suite: {
    src: '/images/luxury-suite.jpg',
    width: 1600,
    height: 1200,
    alt: 'Himalyan luxury suite with twin picture windows framing the Kufri valley, lounge chairs and a plush king bed',
  },
}

const hero = { ...IMAGES['[IMAGE_PLACEHOLDER_1_HERO_VIEW]'], slot: '[IMAGE_PLACEHOLDER_1_HERO_VIEW]' }

/* ==========================================================================
   3. CONTENT
   ========================================================================== */

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#rooms', label: 'Rooms' },
  { href: '#amenities', label: 'Amenities' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
]

// Starting nightly rates (₹), before taxes.
const ROOMS = [
  {
    id: 'deluxe-valley-view',
    name: 'Deluxe Valley View Room',
    badge: 'Most Booked',
    price: 6000,
    guests: 'Up to 3 guests',
    bed: 'King bed',
    image: { ...IMAGES['[IMAGE_PLACEHOLDER_3_DELUXE_ROOM]'], slot: '[IMAGE_PLACEHOLDER_3_DELUXE_ROOM]' },
    gallery: [IMAGES['[IMAGE_PLACEHOLDER_3_DELUXE_ROOM]'], PHOTOS.valleyRoom],
    summary:
      'Warm pine-wood interiors, soft ambient lighting and a generous layout — a calm base for exploring Kufri and Shimla.',
    features: ['Valley-facing windows', 'Room heater', 'Smart TV', 'Tea & coffee kettle', 'Ensuite bathroom with hot water', 'Free Wi-Fi'],
  },
  {
    id: 'premium-balcony',
    name: 'Premium Balcony Room',
    price: 7000,
    guests: 'Up to 3 guests',
    bed: 'King bed',
    image: PHOTOS.valleyRoom,
    gallery: [PHOTOS.valleyRoom, IMAGES['[IMAGE_PLACEHOLDER_1_HERO_VIEW]'], PHOTOS.balconyEvening],
    summary:
      'Step out onto your own private balcony for sunrise chai above the pine forests, and starlit evenings over the valley lights.',
    features: ['Private mountain-view balcony', 'Outdoor seating', 'Room heater', 'Smart TV', 'Tea & coffee kettle', 'Free Wi-Fi'],
  },
  {
    id: 'himalyan-luxury-suite',
    name: 'Himalyan Luxury Suite',
    badge: 'Signature',
    price: 8000,
    guests: 'Up to 4 guests',
    bed: 'King bed + lounge',
    image: PHOTOS.suite,
    gallery: [PHOTOS.suite, PHOTOS.balconyEvening, IMAGES['[IMAGE_PLACEHOLDER_1_HERO_VIEW]']],
    summary:
      'Our finest room: twin picture windows frame the Himalayan ridges, with a private sit-out lounge and plush furnishings.',
    features: ['Panoramic picture windows', 'Private balcony', 'Sit-out lounge area', 'Room heater & premium bedding', 'Smart TV', 'Complimentary breakfast'],
  },
]

const AMENITIES = [
  { icon: Wifi, title: 'Free High-Speed Wi-Fi', text: 'Stay connected in every room and across the property.' },
  { icon: UtensilsCrossed, title: 'In-House Restaurant', text: 'Himachali specialities, North Indian favourites and hot breakfasts.' },
  { icon: Mountain, title: 'Mountain-View Balconies', text: 'Private sit-outs facing the valley and Himalayan ridges.' },
  { icon: ConciergeBell, title: 'Room Service', text: 'Meals, chai and snacks brought straight to your door.' },
  { icon: Heater, title: 'Heating in Every Room', text: 'Cozy and warm through Kufri’s snowy winter nights.' },
  { icon: Car, title: 'Parking & Travel Desk', text: 'On-site parking plus help with cabs and sightseeing.' },
  { icon: Flame, title: 'Hot Water 24/7', text: 'Round-the-clock hot water, even on the coldest days.' },
  { icon: Leaf, title: 'Garden & Terraces', text: 'Landscaped terraces for sunbathing and bonfire evenings.' },
]

const USPS = [
  { icon: Sunrise, title: 'Front-row valley views', text: 'Perched on the hillside with an unobstructed view of the valley and distant Himalayan ranges.' },
  { icon: ShieldCheck, title: 'Peaceful & family-friendly', text: 'Away from the traffic, yet minutes from Kufri’s main attractions.' },
  { icon: Tv, title: 'Modern comforts', text: 'Heated rooms, smart TVs, Wi-Fi and hot water — mountain charm without compromise.' },
]

// Distances are approximate from Kufri town centre.
const ATTRACTIONS = [
  { name: 'Kufri Fun World', distance: '~1 km' },
  { name: 'Himalayan Nature Park', distance: '~1 km' },
  { name: 'Mahasu Peak', distance: '~3 km' },
  { name: 'Chini Bungalow', distance: '~2 km' },
  { name: 'Green Valley', distance: '~6 km' },
  { name: 'Shimla Mall Road', distance: '~16 km' },
]

const GALLERY_PRIMARY = [
  { ...IMAGES['[IMAGE_PLACEHOLDER_4_DINING_OR_BALCONY]'], slot: '[IMAGE_PLACEHOLDER_4_DINING_OR_BALCONY]', caption: 'The restaurant' },
  { ...PHOTOS.valleyClouds, caption: 'Clouds over the valley' },
  { ...PHOTOS.stairway, caption: 'Garden stairway' },
  { ...PHOTOS.courtyard, caption: 'Terrace sit-out' },
]

const GALLERY_MORE = [
  { ...PHOTOS.suite, caption: 'Himalyan Luxury Suite' },
  { ...PHOTOS.mistyWalkway, caption: 'Monsoon mornings' },
  { ...PHOTOS.terrace, caption: 'Rooftop terrace' },
  { ...PHOTOS.balconyEvening, caption: 'Balcony at dusk' },
]

const GALLERY_ALL = [...GALLERY_PRIMARY, ...GALLERY_MORE]

/* ==========================================================================
   4. HELPERS
   ========================================================================== */

const toISODate = (date) => {
  const d = new Date(date)
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}
const addDays = (iso, days) => {
  const d = new Date(`${iso}T00:00:00`)
  d.setDate(d.getDate() + days)
  return toISODate(d)
}
const formatINR = (n) => `₹${n.toLocaleString('en-IN')}`
const formatDate = (iso) =>
  iso ? new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'

const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

/** Fades `.reveal` elements in as they scroll into view. */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/** Locks body scroll and closes on Escape while a modal is open. */
function useModal(open, onClose) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])
}

/* ==========================================================================
   5. SHARED UI
   ========================================================================== */

const btnGold =
  'inline-flex whitespace-nowrap items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold tracking-wide text-pine shadow-sm shadow-gold/30 transition-all duration-300 ease-out hover:scale-105 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/40 active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold'
const btnOutline =
  'inline-flex whitespace-nowrap items-center justify-center gap-2 rounded-full border border-pine/20 px-6 py-3 text-sm font-semibold tracking-wide text-pine transition-all duration-300 ease-out hover:scale-105 hover:border-pine hover:bg-pine hover:text-alabaster hover:shadow-lg hover:shadow-pine/20 active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine'
const inputBase =
  'w-full rounded-xl border border-pine/15 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/45 transition-all duration-300 ease-in-out focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/20'

function Eyebrow({ children }) {
  return (
    <p className="mb-4 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold-deep">
      <span className="h-px w-8 bg-gold" aria-hidden="true" />
      {children}
    </p>
  )
}

function SectionHeading({ id, eyebrow, title, intro, center = false }) {
  return (
    <div className={`reveal mb-12 max-w-2xl md:mb-16 ${center ? 'mx-auto text-center' : ''}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="font-serif text-4xl font-semibold leading-tight text-pine md:text-5xl">{title}</h2>
      {intro && <p className="mt-5 text-base leading-relaxed text-charcoal/80 md:text-lg">{intro}</p>}
    </div>
  )
}

/** Renders a photo; `slot` marks the four swappable placeholder positions. */
function Photo({ image, className = '', eager = false, sizes = '100vw' }) {
  return (
    <img
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      data-placeholder={image.slot}
      className={className}
    />
  )
}

function Logo({ light }) {
  return (
    <a href="#home" className="group flex items-center gap-2.5" aria-label={`${HOTEL.name} – back to top`}>
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ease-in-out ${
          light ? 'border-white/60 text-white' : 'border-pine/25 text-pine'
        } group-hover:border-gold group-hover:text-gold`}
      >
        <Mountain className="h-5 w-5" strokeWidth={1.6} />
      </span>
      <span className="leading-none">
        <span className={`block whitespace-nowrap font-serif text-xl font-bold tracking-wide sm:text-2xl ${light ? 'text-white' : 'text-pine'}`}>
          {HOTEL.shortName}
        </span>
        <span className={`mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.35em] ${light ? 'text-white/85' : 'text-gold-deep'}`}>
          Kufri
        </span>
      </span>
    </a>
  )
}

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
)
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

/* ==========================================================================
   6. SECTIONS
   ========================================================================== */

function Navbar({ onBook }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-in-out ${
        solid ? 'bg-alabaster/95 shadow-[0_1px_0_rgba(26,58,43,0.08)] backdrop-blur-md' : 'bg-gradient-to-b from-black/35 to-transparent'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-5 md:px-8" aria-label="Main navigation">
        <Logo light={!solid} />

        <ul className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full ${
                  solid ? 'text-charcoal hover:text-pine' : 'text-white/95 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <button type="button" onClick={onBook} className={`${btnGold} px-4 py-2.5 text-xs sm:px-6 sm:py-3 sm:text-sm`}>
            Book Now
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className={`rounded-full p-2 transition-colors duration-300 md:hidden ${solid ? 'text-pine hover:bg-cream' : 'text-white hover:bg-white/15'}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-pine/10 bg-alabaster transition-all duration-300 ease-in-out md:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 border-transparent opacity-0'
        }`}
      >
        <ul className="space-y-1 px-5 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 font-medium text-charcoal transition-colors duration-300 hover:bg-cream hover:text-pine"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                onBook()
              }}
              className={`${btnGold} w-full`}
            >
              Book Now
            </button>
          </li>
        </ul>
      </div>
    </header>
  )
}

function BookingWidget({ onCheck }) {
  const today = toISODate(new Date())
  const [checkIn, setCheckIn] = useState(today)
  const [checkOut, setCheckOut] = useState(addDays(today, 2))
  const [guests, setGuests] = useState('2')
  const [error, setError] = useState('')

  const handleCheckIn = (value) => {
    setCheckIn(value)
    if (value && checkOut <= value) setCheckOut(addDays(value, 1))
  }

  const submit = (e) => {
    e.preventDefault()
    if (!checkIn || !checkOut) return setError('Please select both dates.')
    if (checkOut <= checkIn) return setError('Check-out must be after check-in.')
    setError('')
    onCheck({ checkIn, checkOut, guests })
  }

  const label = 'mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-deep'
  const field =
    'w-full bg-transparent text-[15px] font-semibold text-pine focus:outline-none [&::-webkit-date-and-time-value]:text-left'

  return (
    <form
      onSubmit={submit}
      className="enter enter-3 mt-10 w-full max-w-4xl rounded-3xl bg-alabaster/95 p-3 shadow-2xl shadow-black/20 backdrop-blur-md"
      aria-label="Check room availability"
      noValidate
    >
      <div className="grid gap-2 md:grid-cols-[1fr_1fr_0.8fr_auto]">
        <div className="rounded-2xl px-4 py-3 transition-colors duration-300 focus-within:bg-cream hover:bg-cream">
          <label htmlFor="hero-checkin" className={label}>
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /> Check-in
          </label>
          <input id="hero-checkin" type="date" min={today} value={checkIn} onChange={(e) => handleCheckIn(e.target.value)} className={field} required />
        </div>
        <div className="rounded-2xl px-4 py-3 transition-colors duration-300 focus-within:bg-cream hover:bg-cream md:border-l md:border-pine/10">
          <label htmlFor="hero-checkout" className={label}>
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /> Check-out
          </label>
          <input
            id="hero-checkout"
            type="date"
            min={checkIn ? addDays(checkIn, 1) : today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className={field}
            required
          />
        </div>
        <div className="rounded-2xl px-4 py-3 transition-colors duration-300 focus-within:bg-cream hover:bg-cream md:border-l md:border-pine/10">
          <label htmlFor="hero-guests" className={label}>
            <Users className="h-3.5 w-3.5" aria-hidden="true" /> Guests
          </label>
          <select id="hero-guests" value={guests} onChange={(e) => setGuests(e.target.value)} className={`${field} cursor-pointer`}>
            {['1', '2', '3', '4', '5', '6+'].map((n) => (
              <option key={n} value={n}>
                {n} {n === '1' ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={`${btnGold} rounded-2xl px-8 py-4 text-[15px] md:h-full`}>
          Check Availability <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {error && (
        <p role="alert" className="px-4 pt-2 pb-1 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </form>
  )
}

function Hero({ onCheck }) {
  return (
    <section id="home" className="relative isolate flex min-h-[100svh] items-center overflow-hidden" aria-labelledby="hero-title">
      {/* [IMAGE_PLACEHOLDER_1_HERO_VIEW] — full-screen hero background */}
      <div className="absolute inset-0 -z-10">
        <Photo image={hero} eager className="hero-zoom h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-pine/85 via-pine/55 to-pine/10" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/30 to-transparent" aria-hidden="true" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 pt-28 pb-16 md:px-8 md:pt-32">
        <div className="max-w-3xl">
          <p className="enter mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm sm:text-xs sm:tracking-[0.25em]">
            <MapPin className="h-3.5 w-3.5 text-gold-light" aria-hidden="true" /> {HOTEL.tagline}
          </p>
          <h1 id="hero-title" className="enter enter-1 font-serif text-5xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            Himalyan View Kufri
            <span className="mt-3 block text-2xl font-medium leading-snug text-gold-light sm:text-3xl lg:text-4xl">
              Luxury Hotel in Kufri, Shimla with Panoramic Mountain Views
            </span>
          </h1>
          <p className="enter enter-2 mt-6 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
            Wake up above the clouds. Sip your morning chai on a private balcony as the sun rises over pine-clad ridges and the
            Kufri valley unfolds below.
          </p>
        </div>

        <BookingWidget onCheck={onCheck} />

        <ul className="enter enter-4 mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-white/90">
          {['Best rate on direct booking', 'Free cancellation*', 'Pay at hotel'].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-gold-light" aria-hidden="true" /> {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="bg-alabaster py-24 md:py-32" aria-labelledby="about-title">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        {/* [IMAGE_PLACEHOLDER_2_PROPERTY_EXTERNAL] — property showcase, side-by-side with text */}
        <div className="reveal relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="absolute -top-5 -left-5 h-full w-full rounded-[2rem] border border-gold/60" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[2rem] shadow-xl shadow-pine/10">
            <Photo
              image={{ ...IMAGES['[IMAGE_PLACEHOLDER_2_PROPERTY_EXTERNAL]'], slot: '[IMAGE_PLACEHOLDER_2_PROPERTY_EXTERNAL]' }}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
            />
          </div>
          <div className="absolute -right-3 -bottom-8 rounded-2xl bg-pine px-6 py-5 text-alabaster shadow-xl sm:-right-8">
            <p className="font-serif text-4xl font-semibold text-gold-light">2,500 m</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-alabaster/85">Above sea level</p>
          </div>
        </div>

        <div>
          <SectionHeading
            id="about-title"
            eyebrow="Welcome to Kufri"
            title="A serene hillside retreat above the Shimla valley"
            intro="Tucked among deodar and pine forests just 16 km from Shimla, Himalyan View Kufri is where crisp mountain air, snow-dusted winters and golden sunsets meet heartfelt Himachali hospitality."
          />

          <div className="reveal space-y-6">
            {USPS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream text-pine">
                  <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-pine">{title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-charcoal/80">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal mt-12 rounded-3xl bg-cream p-6 md:p-8">
            <h3 className="flex items-center gap-2 font-serif text-2xl font-semibold text-pine">
              <MapPin className="h-5 w-5 text-gold-deep" aria-hidden="true" /> Nearby attractions
            </h3>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {ATTRACTIONS.map((a) => (
                <li key={a.name} className="flex items-baseline justify-between gap-3 border-b border-pine/10 pb-2.5 text-[15px]">
                  <span className="font-medium text-charcoal">{a.name}</span>
                  <span className="shrink-0 text-sm font-semibold text-gold-deep">{a.distance}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-charcoal/65">Distances are approximate, measured from Kufri.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function RoomCard({ room, featured, onView, onBook }) {
  return (
    <article
      className={`reveal group flex flex-col overflow-hidden rounded-3xl bg-alabaster shadow-sm ring-1 ring-pine/5 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-pine/15 ${
        featured ? 'lg:col-span-2 lg:flex-row' : ''
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? 'lg:w-3/5' : ''}`}>
        <Photo
          image={room.image}
          sizes={featured ? '(min-width: 1024px) 40vw, 100vw' : '(min-width: 1024px) 33vw, 100vw'}
          className={`w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 ${
            featured ? 'aspect-[4/3] lg:h-full lg:aspect-auto' : 'aspect-[4/3]'
          }`}
        />
        {room.badge && (
          <span className="absolute top-4 left-4 rounded-full bg-alabaster/95 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-pine shadow-sm">
            {room.badge}
          </span>
        )}
      </div>

      <div className={`flex flex-1 flex-col p-6 md:p-8 ${featured ? 'lg:w-2/5 lg:justify-center' : ''}`}>
        <h3 className="font-serif text-2xl font-semibold text-pine md:text-3xl">{room.name}</h3>
        <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-charcoal/75">
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-4 w-4" aria-hidden="true" /> {room.guests}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BedDouble className="h-4 w-4" aria-hidden="true" /> {room.bed}
          </span>
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-charcoal/80">{room.summary}</p>
        <ul className="mt-5 mb-7 grid grid-cols-1 gap-2 text-sm text-charcoal sm:grid-cols-2">
          {room.features.slice(0, 4).map((f) => (
            <li key={f} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" /> {f}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-pine/10 pt-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/65">From</p>
            <p className="font-serif text-3xl font-semibold text-pine">
              {formatINR(room.price)}
              <span className="font-sans text-sm font-medium text-charcoal/70"> / night</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => onView(room)} className={`${btnOutline} px-5 py-2.5`}>
              View Details
            </button>
            <button type="button" onClick={() => onBook(room)} className={`${btnGold} px-5 py-2.5`} aria-label={`Book ${room.name}`}>
              Book
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

function RoomModal({ room, onClose, onBook }) {
  const [index, setIndex] = useState(0)
  const closeRef = useRef(null)
  useModal(Boolean(room), onClose)

  useEffect(() => {
    setIndex(0)
    if (room) closeRef.current?.focus()
  }, [room])

  if (!room) return null
  const image = room.gallery[index]
  const go = (d) => setIndex((i) => (i + d + room.gallery.length) % room.gallery.length)

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-cream/85 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="room-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-alabaster shadow-2xl ring-1 ring-pine/10 sm:rounded-3xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-alabaster/95 p-2 text-pine shadow transition-all duration-300 hover:rotate-90 hover:bg-gold"
          aria-label="Close room details"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative">
          <Photo image={image} sizes="(min-width: 896px) 896px, 100vw" className="aspect-[16/10] w-full object-cover" />
          {room.gallery.length > 1 && (
            <>
              <button type="button" onClick={() => go(-1)} className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-alabaster/90 p-2 text-pine shadow transition-all duration-300 hover:bg-gold" aria-label="Previous photo">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button type="button" onClick={() => go(1)} className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-alabaster/90 p-2 text-pine shadow transition-all duration-300 hover:bg-gold" aria-label="Next photo">
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {room.gallery.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-gold' : 'w-2 bg-white/80'}`}
                    aria-label={`Show photo ${i + 1}`}
                    aria-current={i === index}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="grid gap-8 p-6 md:grid-cols-[1.4fr_1fr] md:p-10">
          <div>
            <h2 id="room-modal-title" className="font-serif text-3xl font-semibold text-pine md:text-4xl">
              {room.name}
            </h2>
            <p className="mt-2 flex flex-wrap gap-x-4 text-sm text-charcoal/75">
              <span>{room.guests}</span>
              <span>{room.bed}</span>
            </p>
            <p className="mt-5 leading-relaxed text-charcoal/85">{room.summary}</p>
            <h3 className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-gold-deep">Room features</h3>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {room.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[15px] text-charcoal">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="self-start rounded-2xl bg-cream p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/65">Starting from</p>
            <p className="mt-1 font-serif text-4xl font-semibold text-pine">
              {formatINR(room.price)}
              <span className="font-sans text-sm font-medium text-charcoal/70"> / night</span>
            </p>
            <p className="mt-1 text-xs text-charcoal/65">Taxes extra. Rates vary by season.</p>
            <ul className="mt-5 space-y-2 text-sm text-charcoal">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gold-deep" aria-hidden="true" /> Check-in {HOTEL.checkIn} · Check-out {HOTEL.checkOut}
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-gold-deep" aria-hidden="true" /> Best price on direct booking
              </li>
            </ul>
            <button type="button" onClick={() => onBook(room)} className={`${btnGold} mt-6 w-full`}>
              Request this room <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Rooms({ onBookRoom }) {
  const [selected, setSelected] = useState(null)
  const close = useCallback(() => setSelected(null), [])

  return (
    <section id="rooms" className="bg-cream py-24 md:py-32" aria-labelledby="rooms-title">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Rooms & Suites"
            id="rooms-title"
            title="Handcrafted comfort, framed by the mountains"
            intro="Every room blends warm pine-wood interiors with modern comforts — heated, cozy and designed for slow mountain mornings."
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {ROOMS.map((room, i) => (
            <RoomCard
              key={room.id}
              room={room}
              featured={i === 0}
              onView={setSelected}
              onBook={(r) => {
                setSelected(null)
                onBookRoom(r)
              }}
            />
          ))}
        </div>
      </div>

      <RoomModal
        room={selected}
        onClose={close}
        onBook={(r) => {
          setSelected(null)
          onBookRoom(r)
        }}
      />
    </section>
  )
}

function Amenities() {
  return (
    <section id="amenities" className="bg-alabaster py-24 md:py-32" aria-labelledby="amenities-title">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          center
          eyebrow="Amenities"
          id="amenities-title"
            title="Everything you need for a perfect mountain stay"
          intro="Thoughtful comforts so you can focus on the view."
        />
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {AMENITIES.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="reveal group rounded-3xl border border-pine/10 bg-white p-5 sm:p-7 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-gold/60 hover:shadow-xl hover:shadow-pine/5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream text-pine transition-all sm:h-14 sm:w-14 duration-300 ease-in-out group-hover:bg-pine group-hover:text-gold-light">
                <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-serif text-lg leading-snug font-semibold text-pine sm:mt-5 sm:text-xl">{title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-charcoal/80 sm:text-sm">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Lightbox({ index, onClose, onNavigate }) {
  const open = index !== null
  useModal(open, onClose)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') onNavigate(1)
      if (e.key === 'ArrowLeft') onNavigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onNavigate])

  if (!open) return null
  const item = GALLERY_ALL[index]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-alabaster/97 p-4 backdrop-blur-sm md:p-10"
      onClick={onClose}
    >
      <button type="button" onClick={onClose} className="absolute top-4 right-4 rounded-full bg-cream p-2.5 text-pine transition-all duration-300 hover:rotate-90 hover:bg-gold" aria-label="Close photo viewer" autoFocus>
        <X className="h-5 w-5" />
      </button>
      <figure className="flex max-h-full w-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.alt} className="max-h-[78svh] w-auto rounded-2xl object-contain shadow-2xl" />
        <figcaption className="mt-4 text-center font-serif text-xl text-pine">
          {item.caption} <span className="ml-2 font-sans text-sm text-charcoal/65">{index + 1} / {GALLERY_ALL.length}</span>
        </figcaption>
      </figure>
      <button type="button" onClick={(e) => { e.stopPropagation(); onNavigate(-1) }} className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-cream p-3 text-pine shadow transition-all duration-300 hover:bg-gold md:left-6" aria-label="Previous photo">
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button type="button" onClick={(e) => { e.stopPropagation(); onNavigate(1) }} className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-cream p-3 text-pine shadow transition-all duration-300 hover:bg-gold md:right-6" aria-label="Next photo">
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  )
}

function GalleryTile({ item, index, onOpen, className = '', sizes }) {
  return (
    <li className={`reveal group relative overflow-hidden rounded-3xl bg-cream shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-pine/15 ${className}`}>
      <button type="button" onClick={() => onOpen(index)} className="block h-full w-full text-left" aria-label={`Enlarge photo: ${item.caption}`}>
        <Photo image={item} sizes={sizes} className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105" />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pine/70 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="pointer-events-none absolute right-5 bottom-4 left-5 flex items-center justify-between text-white">
          <span className="font-serif text-lg font-semibold md:text-xl">{item.caption}</span>
          <Expand className="h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
        </span>
      </button>
    </li>
  )
}

function Gallery() {
  const [index, setIndex] = useState(null)
  const close = useCallback(() => setIndex(null), [])
  const navigate = useCallback((d) => setIndex((i) => (i + d + GALLERY_ALL.length) % GALLERY_ALL.length), [])

  return (
    <section id="gallery" className="bg-cream py-24 md:py-32" aria-labelledby="gallery-title">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Gallery"
          id="gallery-title"
            title="Moments at Himalyan View Kufri"
          intro="From candle-lit dinners in our wood-panelled restaurant to clouds drifting through the valley below — a glimpse of life on the hillside."
        />

        {/* Four primary gallery slots — the large tile is [IMAGE_PLACEHOLDER_4_DINING_OR_BALCONY] */}
        <ul className="grid auto-rows-[220px] grid-cols-2 gap-4 md:auto-rows-[260px] md:grid-cols-4 md:gap-5">
          <GalleryTile item={GALLERY_PRIMARY[0]} index={0} onOpen={setIndex} sizes="(min-width: 768px) 50vw, 100vw" className="col-span-2 row-span-2" />
          <GalleryTile item={GALLERY_PRIMARY[1]} index={1} onOpen={setIndex} sizes="(min-width: 768px) 25vw, 50vw" />
          <GalleryTile item={GALLERY_PRIMARY[2]} index={2} onOpen={setIndex} sizes="(min-width: 768px) 25vw, 50vw" />
          <GalleryTile item={GALLERY_PRIMARY[3]} index={3} onOpen={setIndex} sizes="(min-width: 768px) 50vw, 100vw" className="col-span-2" />
        </ul>

        <ul className="mt-4 grid grid-cols-2 gap-4 md:mt-5 md:grid-cols-4 md:gap-5">
          {GALLERY_MORE.map((item, i) => (
            <GalleryTile key={item.src} item={item} index={GALLERY_PRIMARY.length + i} onOpen={setIndex} sizes="(min-width: 768px) 25vw, 50vw" className="aspect-square" />
          ))}
        </ul>
      </div>

      <Lightbox index={index} onClose={close} onNavigate={navigate} />
    </section>
  )
}

const EMPTY_FORM = { name: '', email: '', phone: '', checkIn: '', checkOut: '', guests: '2', room: '', message: '' }

function Contact({ prefill }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const today = toISODate(new Date())

  useEffect(() => {
    if (prefill) {
      setForm((f) => ({ ...f, ...prefill }))
      setStatus('idle')
    }
  }, [prefill])

  const update = (key) => (e) => {
    const value = e.target.value
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }))
  }

  const validate = () => {
    const err = {}
    if (!form.name.trim()) err.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Please enter a valid email.'
    if (form.phone && !/^[+\d][\d\s-]{7,}$/.test(form.phone)) err.phone = 'Please enter a valid phone number.'
    if (form.checkIn && form.checkOut && form.checkOut <= form.checkIn) err.checkOut = 'Check-out must be after check-in.'
    return err
  }

  const buildMessage = () =>
    [
      `Booking inquiry — ${HOTEL.name}`,
      '',
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || '—'}`,
      `Check-in: ${formatDate(form.checkIn)}`,
      `Check-out: ${formatDate(form.checkOut)}`,
      `Guests: ${form.guests}`,
      `Room: ${form.room || 'No preference'}`,
      '',
      form.message,
    ].join('\n')

  const submit = async (e) => {
    e.preventDefault()
    const err = validate()
    setErrors(err)
    if (Object.keys(err).length) {
      document.getElementById(`contact-${Object.keys(err)[0]}`)?.focus()
      return
    }

    if (!HOTEL.formEndpoint) {
      const subject = encodeURIComponent(`Booking inquiry: ${form.checkIn || 'dates TBC'} – ${form.name}`)
      window.location.href = `mailto:${HOTEL.email}?subject=${subject}&body=${encodeURIComponent(buildMessage())}`
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(HOTEL.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: `Booking inquiry — ${form.name}` }),
      })
      if (!res.ok) throw new Error(res.statusText)
      setStatus('sent')
      setForm(EMPTY_FORM)
    } catch {
      setStatus('error')
    }
  }

  const whatsappHref = `https://wa.me/${HOTEL.whatsapp}?text=${encodeURIComponent(`Hi ${HOTEL.name}, I'd like to enquire about a stay.`)}`
  const label = 'mb-1.5 block text-sm font-semibold text-pine'
  const errorText = (key) =>
    errors[key] && (
      <p id={`contact-${key}-error`} className="mt-1.5 text-xs font-medium text-red-700">
        {errors[key]}
      </p>
    )
  const aria = (key) => ({ 'aria-invalid': Boolean(errors[key]), 'aria-describedby': errors[key] ? `contact-${key}-error` : undefined })

  return (
    <section id="contact" className="bg-alabaster py-24 md:py-32" aria-labelledby="contact-title">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Book Your Stay"
            id="contact-title"
            title="Plan your Kufri getaway"
            intro="Send us your dates and we’ll get back within a few hours with availability and our best direct rate."
          />

          <ul className="reveal space-y-5">
            <li className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-pine">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold text-pine">Address</h3>
                <address className="text-[15px] not-italic leading-relaxed text-charcoal/80">{HOTEL.address}</address>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-pine">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold text-pine">Call us</h3>
                <a href={`tel:${HOTEL.phone.replace(/\s/g, '')}`} className="text-[15px] text-charcoal/80 transition-colors duration-300 hover:text-pine">
                  {HOTEL.phone}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-pine">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold text-pine">Email</h3>
                <a href={`mailto:${HOTEL.email}`} className="text-[15px] text-charcoal/80 transition-colors duration-300 hover:text-pine">
                  {HOTEL.email}
                </a>
              </div>
            </li>
          </ul>

          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={`${btnOutline} reveal mt-8`}>
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat on WhatsApp
          </a>

          <div className="reveal mt-10 overflow-hidden rounded-3xl ring-1 ring-pine/10">
            <iframe
              title={`Map showing the location of ${HOTEL.name}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(HOTEL.mapQuery)}&output=embed`}
              className="h-64 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="reveal self-start rounded-[2rem] bg-cream p-6 shadow-sm md:p-10">
          {status === 'sent' ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center" role="status">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pine text-gold-light">
                <Check className="h-8 w-8" aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-serif text-3xl font-semibold text-pine">Thank you, {form.name.split(' ')[0] || 'traveller'}!</h3>
              <p className="mt-3 max-w-sm text-charcoal/80">
                {HOTEL.formEndpoint
                  ? 'Your inquiry has been received. Our team will contact you shortly with availability and rates.'
                  : 'Your email app should have opened with your inquiry ready to send. If it didn’t, email us directly or reach us on WhatsApp.'}
              </p>
              <button type="button" onClick={() => setStatus('idle')} className={`${btnOutline} mt-8`}>
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate aria-label="Booking inquiry form">
              <h3 className="font-serif text-3xl font-semibold text-pine">Reservation inquiry</h3>
              <p className="mt-1 text-sm text-charcoal/70">
                Fields marked <span className="text-red-700">*</span> are required.
              </p>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="contact-name" className={label}>
                    Full name <span className="text-red-700">*</span>
                  </label>
                  <input id="contact-name" autoComplete="name" value={form.name} onChange={update('name')} className={inputBase} placeholder="Your full name" required {...aria('name')} />
                  {errorText('name')}
                </div>
                <div>
                  <label htmlFor="contact-email" className={label}>
                    Email <span className="text-red-700">*</span>
                  </label>
                  <input id="contact-email" type="email" autoComplete="email" value={form.email} onChange={update('email')} className={inputBase} placeholder="you@example.com" required {...aria('email')} />
                  {errorText('email')}
                </div>
                <div>
                  <label htmlFor="contact-phone" className={label}>
                    Phone / WhatsApp
                  </label>
                  <input id="contact-phone" type="tel" autoComplete="tel" value={form.phone} onChange={update('phone')} className={inputBase} placeholder="+91" {...aria('phone')} />
                  {errorText('phone')}
                </div>
                <div>
                  <label htmlFor="contact-checkIn" className={label}>
                    Check-in
                  </label>
                  <input id="contact-checkIn" type="date" min={today} value={form.checkIn} onChange={update('checkIn')} className={inputBase} />
                </div>
                <div>
                  <label htmlFor="contact-checkOut" className={label}>
                    Check-out
                  </label>
                  <input id="contact-checkOut" type="date" min={form.checkIn ? addDays(form.checkIn, 1) : today} value={form.checkOut} onChange={update('checkOut')} className={inputBase} {...aria('checkOut')} />
                  {errorText('checkOut')}
                </div>
                <div>
                  <label htmlFor="contact-guests" className={label}>
                    Guests
                  </label>
                  <select id="contact-guests" value={form.guests} onChange={update('guests')} className={`${inputBase} cursor-pointer`}>
                    {['1', '2', '3', '4', '5', '6+'].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-room" className={label}>
                    Room preference
                  </label>
                  <select id="contact-room" value={form.room} onChange={update('room')} className={`${inputBase} cursor-pointer`}>
                    <option value="">No preference</option>
                    {ROOMS.map((r) => (
                      <option key={r.id} value={r.name}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="contact-message" className={label}>
                    Special requests
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={form.message}
                    onChange={update('message')}
                    className={`${inputBase} resize-none`}
                    placeholder="Anniversary, early check-in, cab pickup from Shimla…"
                  />
                </div>
              </div>

              {status === 'error' && (
                <p role="alert" className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
                  Sorry, something went wrong sending your inquiry. Please call or WhatsApp us instead.
                </p>
              )}

              <button type="submit" disabled={status === 'sending'} className={`${btnGold} mt-7 w-full py-4 text-base disabled:cursor-wait disabled:opacity-70`}>
                {status === 'sending' ? 'Sending…' : 'Send Inquiry'} <Send className="h-4 w-4" aria-hidden="true" />
              </button>
              <p className="mt-4 text-center text-xs text-charcoal/65">We respect your privacy. Your details are only used to respond to your inquiry.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  const social = [
    { href: HOTEL.social.instagram, label: 'Instagram', Icon: InstagramIcon },
    { href: HOTEL.social.facebook, label: 'Facebook', Icon: FacebookIcon },
    { href: `https://wa.me/${HOTEL.whatsapp}`, label: 'WhatsApp', Icon: MessageCircle },
  ]

  return (
    <footer className="border-t border-pine/10 bg-cream pt-16 pb-28 md:pb-12">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-charcoal/80">
              Himalyan View Kufri is a boutique mountain hotel in Kufri, near Shimla, Himachal Pradesh — offering valley-view rooms,
              private balconies, an in-house restaurant and warm hospitality for families, couples and snow-seekers year-round.
            </p>
            <ul className="mt-6 flex gap-3">
              {social.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${HOTEL.name} on ${label}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-pine/15 text-pine transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:border-pine hover:bg-pine hover:text-gold-light"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">Explore</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-charcoal/85 transition-colors duration-300 hover:text-pine">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-deep">Visit</h2>
            <address className="mt-5 space-y-3 text-sm not-italic text-charcoal/85">
              <p className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" /> {HOTEL.address}
              </p>
              <p className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                <a href={`tel:${HOTEL.phone.replace(/\s/g, '')}`} className="hover:text-pine">{HOTEL.phone}</a>
              </p>
              <p className="flex gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                <a href={`mailto:${HOTEL.email}`} className="break-all hover:text-pine">{HOTEL.email}</a>
              </p>
              <p className="flex gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" /> Check-in {HOTEL.checkIn} · Check-out {HOTEL.checkOut}
              </p>
            </address>
          </div>
        </div>

        <div className="mt-14 border-t border-pine/10 pt-8 text-xs leading-relaxed text-charcoal/70">
          <p>
            Looking for the best hotel in Kufri? Himalyan View Kufri is a luxury stay near Shimla with mountain-view rooms, ideal for
            snowfall holidays, honeymoons and family trips to Kufri Fun World, Mahasu Peak and the Himalayan Nature Park.
          </p>
          <p className="mt-4 flex flex-col justify-between gap-2 sm:flex-row">
            <span>© {year} {HOTEL.name}. All rights reserved.</span>
            <span>*Free cancellation on eligible direct bookings. Terms apply.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

/** Sticky "Book Now" bar on phones once the hero booking widget has scrolled away. */
function MobileBookBar({ onBook }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-pine/10 bg-alabaster/95 px-4 py-3 backdrop-blur-md transition-all duration-300 ease-in-out md:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!show}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1 leading-tight">
          <p className="text-xs text-charcoal/70">Rooms from</p>
          <p className="font-serif text-xl font-semibold text-pine">{formatINR(Math.min(...ROOMS.map((r) => r.price)))}<span className="font-sans text-xs text-charcoal/70"> / night</span></p>
        </div>
        <a href={`tel:${HOTEL.phone.replace(/\s/g, '')}`} className={`${btnOutline} px-4`} aria-label="Call the hotel" tabIndex={show ? 0 : -1}>
          <Phone className="h-4 w-4" />
        </a>
        <button type="button" onClick={onBook} className={btnGold} tabIndex={show ? 0 : -1}>
          Book Now
        </button>
      </div>
    </div>
  )
}

/* ==========================================================================
   7. APP
   ========================================================================== */

export default function App() {
  const [prefill, setPrefill] = useState(null)
  useReveal()

  const goToBooking = useCallback((data) => {
    if (data) setPrefill({ ...data })
    scrollToId('contact')
    setTimeout(() => document.getElementById('contact-name')?.focus({ preventScroll: true }), 700)
  }, [])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-gold focus:px-5 focus:py-2.5 focus:text-pine">
        Skip to content
      </a>
      <Navbar onBook={() => goToBooking()} />
      <main id="main">
        <Hero onCheck={goToBooking} />
        <About />
        <Rooms onBookRoom={(room) => goToBooking({ room: room.name })} />
        <Amenities />
        <Gallery />
        <Contact prefill={prefill} />
      </main>
      <Footer />
      <MobileBookBar onBook={() => goToBooking()} />
    </>
  )
}
