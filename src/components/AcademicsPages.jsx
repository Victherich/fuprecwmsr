import React from 'react'
import AcademicHero from './AcademicsHero'
import CurriculumOverview from './CurriculumOverview'
import Introduction from './Introduction'
import Philosophy from './Philosophy'
import AdmissionRequirements from './AdmissionsRequirements'
import CourseGuidelines from './CourseGuidelines'
import ProgrammesOverview from './ProgrammesOverview'
import ProgrammePage from './ProgrammePage'
import AcademicDepartments from './AcademicDepartments'


const AcademicsPages = () => {
  return (
    <div>
        <AcademicHero/>
        <CurriculumOverview/>
        <Introduction/>
        <Philosophy/>
        <AdmissionRequirements/>  
        <CourseGuidelines/>
        <ProgrammesOverview/>
        <ProgrammePage/>
        <AcademicDepartments/>
      
    </div>
  )
}

export default AcademicsPages
