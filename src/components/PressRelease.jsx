import React from 'react'
import PressReleaseA from './PressReleaseA'
import VisitShowcase from './VisitShowcase'
import CourtesyVisitSection from './CourtesyVisitSection'
import LectureEventSection from './LectureEventSection'
import GuestRecognitionSection from './GuestRecognitionSection'

const PressRelease = () => {
  return (
    <div>
      <PressReleaseA/>
      <VisitShowcase/>
      <CourtesyVisitSection/>
      <LectureEventSection/>
      <GuestRecognitionSection/>
    </div>
  )
}

export default PressRelease
