import React, { useState } from 'react'
import { createContext } from 'react'

export const Context = createContext();

const ContextProvider = ({children}) => {
    const [adminToken,setAdminToken]=useState(null)
    const [admin,setAdmin]=useState(null)
    const [adminMenu,setAdminMenu]=useState(0) 
    const [trackingID, setTrackingID] = useState('');
    const check = ''



    const programs = [
      { id: 1, name: "Postgraduate Diploma (PGD) in Petroleum Waste Management" },
      { id: 2, name: "Postgraduate Diploma (PGD) in Waste Management" },
      { id: 3, name: "Postgraduate Diploma (PGD) in Environmental Social Work & Community Development" },
      { id: 4, name: "Postgraduate Diploma (PGD) in Environmental Health Management" },
      { id: 5, name: "Master Degree in Petroleum Waste Management" },
      { id: 6, name: "Master Degree in Waste Management" },
      { id: 7, name: "Master Degree in Environmental Social Work & Community Development" },
      { id: 8, name: "Master Degree in Environmental Health Management" },
      { id: 9, name: "Master of Philosophy (M.Phil.) in Petroleum Waste Management" },
      { id: 10, name: "Master of Philosophy (M.Phil.) in Waste Management" },
      { id: 11, name: "Master of Philosophy (M.Phil.) in Environmental Social Work & Community Development" },
      { id: 12, name: "Master of Philosophy (M.Phil.) in Environmental Health Management" },
      { id: 13, name: "Doctor of Philosophy (Ph.D.) in Petroleum Waste Management" },
      { id: 14, name: "Doctor of Philosophy (Ph.D.) in Waste Management" },
      { id: 15, name: "Doctor of Philosophy (Ph.D.) in Environmental Social Work & Community Development" },
      { id: 16, name: "Doctor of Philosophy (Ph.D.) in Environmental Health Management" }
    ];
    
    

const levels = [
  { id: 1, name: "Default" },
];

const semesters = [
  { id: 1, name: "Semester 1" },
  { id: 2, name: "Semester 2" },
];


const courses = [


  // PGD COURSES ###############################

  // // First Semester
  // { id: 1, code: "PWM 751", title: "Introduction to Petroleum Waste Management", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 1 },
  // { id: 2, code: "PWM 752", title: "Drilling Waste Management", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 1 },
  // { id: 3, code: "PWM 753", title: "Produced Water Treatment and Management", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 1 },
  // { id: 4, code: "PWM 754", title: "Environmental Impact of Oil Spillage", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 1 },
  // { id: 5, code: "PWM 755", title: "Regulations and Compliance in the Oil and Gas Sector", unit: 2, status: "R", program_id: 1, level_id: 1, semester_id: 1 },
  // { id: 6, code: "PWM 756", title: "Principles of Oil Spill Response and Remediation", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 1 },
  // { id: 7, code: "PWM 758", title: "Health, Safety, and Environmental (HSE) Management", unit: 3, status: "R", program_id: 1, level_id: 1, semester_id: 1 },
  // { id: 8, code: "PWM 759", title: "Seminar", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 1 },

  // // Second Semester
  // { id: 9, code: "PWM 761", title: "Waste Treatment Technologies in Oil and Gas", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 2 },
  // { id: 10, code: "PWM 762", title: "Hazardous Waste Management in Petroleum Operations", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 2 },
  // { id: 11, code: "PWM 763", title: "Sustainable Practices in Petroleum Waste Management", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 2 },
  // { id: 12, code: "PWM 764", title: "Environmental Monitoring and Reporting", unit: 3, status: "R", program_id: 1, level_id: 1, semester_id: 2 },
  // { id: 13, code: "PWM 765", title: "Advanced Hydrocarbon Recovery and Waste Minimization", unit: 3, status: "R", program_id: 1, level_id: 1, semester_id: 2 },
  // { id: 14, code: "PWM 766", title: "Contaminated Site Assessment and Remediation", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 2 },
  // { id: 15, code: "PWM 768", title: "Climate Change and the Petroleum Industry", unit: 3, status: "E", program_id: 1, level_id: 1, semester_id: 2 },
  // { id: 16, code: "PWM 799", title: "Project", unit: 6, status: "C", program_id: 1, level_id: 1, semester_id: 2 },



  //     // First Semester
  //   { id: 17, code: "WM 711", title: "Principles of Waste Management", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 1 },
  //   { id: 18, code: "WM 712", title: "Solid Waste Management and Technology", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 1 },
  //   { id: 19, code: "WM 713", title: "Hazardous Waste Management", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 1 },
  //   { id: 20, code: "WM 714", title: "Waste Management in the Oil and Gas Industry", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 1 },
  
  // First Semester
{ id: 1, code: "PWM 751", title: "Introduction to Petroleum Waste Management", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 1, link: "https://meet.google.com/uzj-dtzb-cmx" },
{ id: 2, code: "PWM 752", title: "Drilling Waste Management", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 1, link: "https://meet.google.com/jzi-xajj-zeh" },
{ id: 3, code: "PWM 753", title: "Produced Water Treatment and Management", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 1, link: "https://meet.google.com/rng-ppjg-jek" },
{ id: 4, code: "PWM 754", title: "Environmental Impact of Oil Spillage", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 1, link: "https://meet.google.com/uyj-byhc-hcz" },
{ id: 5, code: "PWM 755", title: "Regulations and Compliance in the Oil and Gas Sector", unit: 2, status: "R", program_id: 1, level_id: 1, semester_id: 1, link: "https://meet.google.com/tpa-mwww-jgc" },
{ id: 6, code: "PWM 756", title: "Principles of Oil Spill Response and Remediation", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 1, link: "https://meet.google.com/xiw-kocb-yfu" },
{ id: 7, code: "PWM 758", title: "Health, Safety, and Environmental (HSE) Management", unit: 3, status: "R", program_id: 1, level_id: 1, semester_id: 1, link: "https://meet.google.com/wdi-txbj-zzh" },
{ id: 8, code: "PWM 759", title: "Seminar", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 1, link: "https://meet.google.com/byc-pekw-dji" },

// Second Semester
{ id: 9, code: "PWM 761", title: "Waste Treatment Technologies in Oil and Gas", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 2, link: "https://meet.google.com/nkj-abqv-eyt" },
{ id: 10, code: "PWM 762", title: "Hazardous Waste Management in Petroleum Operations", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 2, link: "https://meet.google.com/kxf-eixo-mfq" },
{ id: 11, code: "PWM 763", title: "Sustainable Practices in Petroleum Waste Management", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 2, link: "https://meet.google.com/gyz-asgy-yrx" },
{ id: 12, code: "PWM 764", title: "Environmental Monitoring and Reporting", unit: 3, status: "R", program_id: 1, level_id: 1, semester_id: 2, link: "https://meet.google.com/tch-vfad-hhb" },
{ id: 13, code: "PWM 765", title: "Advanced Hydrocarbon Recovery and Waste Minimization", unit: 3, status: "R", program_id: 1, level_id: 1, semester_id: 2, link: "https://meet.google.com/yfv-jcvv-jts" },
{ id: 14, code: "PWM 766", title: "Contaminated Site Assessment and Remediation", unit: 3, status: "C", program_id: 1, level_id: 1, semester_id: 2, link: "https://meet.google.com/cwj-bdso-upt" },
{ id: 15, code: "PWM 768", title: "Climate Change and the Petroleum Industry", unit: 3, status: "E", program_id: 1, level_id: 1, semester_id: 2, link: "https://meet.google.com/bet-byvh-sym" },
{ id: 16, code: "PWM 799", title: "Project", unit: 6, status: "C", program_id: 1, level_id: 1, semester_id: 2, link: "https://meet.google.com/uui-kxgs-gtt" },

// Waste Management Program – First Semester
{ id: 17, code: "WM 711", title: "Principles of Waste Management", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 1, link: "https://meet.google.com/afs-ncmr-nka" },
{ id: 18, code: "WM 712", title: "Solid Waste Management and Technology", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 1, link: "https://meet.google.com/poc-wssg-mwc" },
{ id: 19, code: "WM 713", title: "Hazardous Waste Management", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 1, link: "https://meet.google.com/hxn-quxv-yyf" },
{ id: 20, code: "WM 714", title: "Waste Management in the Oil and Gas Industry", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 1, link: "https://meet.google.com/rpz-yirn-hku" },

  
  
  
  // { id: 21, code: "WM 715", title: "Waste Reduction, Reuse, and Recycling", unit: 3, status: "R", program_id: 2, level_id: 1, semester_id: 1 },
  //   { id: 22, code: "WM 716", title: "Environmental Law and Waste Regulations", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 1 },
  //   { id: 23, code: "WM 718", title: "Health, Safety, and Environmental (HSE) Management", unit: 3, status: "R", program_id: 2, level_id: 1, semester_id: 1 },
  //   { id: 24, code: "WM 719", title: "Seminar", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 1 },
  
  //   // Second Semester
  //   { id: 25, code: "WM 721", title: "Advanced Waste Treatment Technologies", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 2 },
  //   { id: 26, code: "WM 722", title: "Wastewater Treatment and Management", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 2 },
  //   { id: 27, code: "WM 723", title: "Composting and Organic Waste Management", unit: 3, status: "E", program_id: 2, level_id: 1, semester_id: 2 },
  //   { id: 28, code: "WM 724", title: "Landfill Design and Operation", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 2 },
  //   { id: 29, code: "WM 725", title: "Pollution Prevention and Control", unit: 3, status: "R", program_id: 2, level_id: 1, semester_id: 2 },
  //   { id: 30, code: "WM 726", title: "Sustainable Waste Management Practices", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 2 },
    

  { id: 21, code: "WM 715", title: "Waste Reduction, Reuse, and Recycling", unit: 3, status: "R", program_id: 2, level_id: 1, semester_id: 1, link: "https://meet.google.com/tub-osno-mqk" },
{ id: 22, code: "WM 716", title: "Environmental Law and Waste Regulations", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 1, link: "https://meet.google.com/wou-ayuo-udi" },
{ id: 23, code: "WM 718", title: "Health, Safety, and Environmental (HSE) Management", unit: 3, status: "R", program_id: 2, level_id: 1, semester_id: 1, link: "https://meet.google.com/dqw-mfcs-xgx" },
{ id: 24, code: "WM 719", title: "Seminar", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 1, link: "https://meet.google.com/ykt-cvmq-cow" },

// Second Semester
{ id: 25, code: "WM 721", title: "Advanced Waste Treatment Technologies", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 2, link: "https://meet.google.com/oqi-uwfg-ajg" },
{ id: 26, code: "WM 722", title: "Wastewater Treatment and Management", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 2, link: "https://meet.google.com/kia-zbwg-vxw" },
{ id: 27, code: "WM 723", title: "Composting and Organic Waste Management", unit: 3, status: "E", program_id: 2, level_id: 1, semester_id: 2, link: "https://meet.google.com/uuj-opef-rsj" },
{ id: 28, code: "WM 724", title: "Landfill Design and Operation", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 2, link: "https://meet.google.com/ivn-cywg-fii" },
{ id: 29, code: "WM 725", title: "Pollution Prevention and Control", unit: 3, status: "R", program_id: 2, level_id: 1, semester_id: 2, link: "https://meet.google.com/xhi-jwur-qzg" },
{ id: 30, code: "WM 726", title: "Sustainable Waste Management Practices", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 2, link: "https://meet.google.com/cqv-tpyk-fdf" },

    

  //   { id: 31, code: "WM 728", title: "Environmental Monitoring and Reporting", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 2 },
  //   { id: 32, code: "WM 799", title: "Project", unit: 6, status: "C", program_id: 2, level_id: 1, semester_id: 2 },
  
  



    
  //     // First Semester
  //     { id: 33, code: "EHM 711", title: "Introduction to Environmental Health", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 1 },
  //     { id: 34, code: "EHM 712", title: "Principles of Toxicology and Human Health", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 1 },
  //     { id: 35, code: "EHM 713", title: "Water Quality Management and Control", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 1 },
  //     { id: 36, code: "EHM 714", title: "Air Quality Management and Control", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 1 },
  //     { id: 37, code: "EHM 715", title: "Occupational Health and Safety", unit: 3, status: "R", program_id: 3, level_id: 1, semester_id: 1 },
  //     { id: 38, code: "EHM 716", title: "Environmental Health Risk Assessment", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 1 },
  //     { id: 39, code: "EHM 718", title: "Fundamentals of Epidemiology and Biostatistics", unit: 3, status: "R", program_id: 3, level_id: 1, semester_id: 1 },
  //     { id: 40, code: "EHM 719", title: "Seminar", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 1 },
    
  //     // Second Semester
  //     { id: 41, code: "EHM 721", title: "Environmental Microbiology", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 2 },
  //     { id: 42, code: "EHM 722", title: "Food Safety and Hygiene", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 2 },
  //     { id: 43, code: "EHM 723", title: "Vector Control and Pest Management", unit: 3, status: "E", program_id: 3, level_id: 1, semester_id: 2 },
  //     { id: 44, code: "EHM 724", title: "Environmental Health Policy and Legislation", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 2 },
  //     { id: 45, code: "EHM 725", title: "Waste Management in Environmental Health", unit: 3, status: "R", program_id: 3, level_id: 1, semester_id: 2 },
  //     { id: 46, code: "EHM 726", title: "Disaster Preparedness and Emergency Response", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 2 },
  //     { id: 47, code: "EHM 728", title: "Environmental Monitoring and Surveillance", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 2 },
  //     { id: 48, code: "EHM 799", title: "Project", unit: 6, status: "C", program_id: 3, level_id: 1, semester_id: 2 },
    
      
  //       // First Semester
  //       { id: 49, code: "ESW 711", title: "Introduction to Environmental Social Work", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 1 },
  //       { id: 50, code: "ESW 712", title: "Community Development Theory and Practice", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 1 },
  //       { id: 51, code: "ESW 713", title: "Environmental Justice and Advocacy", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 1 },
  //       { id: 52, code: "ESW 714", title: "Sustainable Development Goals (SDGs) and Social Work", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 1 },
  //       { id: 53, code: "ESW 715", title: "Social Research Methods and Data Analysis", unit: 3, status: "R", program_id: 4, level_id: 1, semester_id: 1 },
  //       { id: 54, code: "ESW 716", title: "Project Planning and Management in Community Settings", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 1 },
  //       { id: 55, code: "ESW 718", title: "Gender, Environment, and Development", unit: 3, status: "E", program_id: 4, level_id: 1, semester_id: 1 },
  //       { id: 56, code: "ESW 719", title: "Seminar in Environmental Social Work", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 1 },
      
  //       // Second Semester
  //       { id: 57, code: "ESW 721", title: "Social Work in Disaster and Emergency Situations", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 2 },
  //       { id: 58, code: "ESW 722", title: "Environmental Policy and Community Advocacy", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 2 },
  //       { id: 59, code: "ESW 723", title: "Public Health and Community Well-being", unit: 3, status: "E", program_id: 4, level_id: 1, semester_id: 2 },
  //       { id: 60, code: "ESW 724", title: "Environmental Education and Awareness", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 2 },
  //       { id: 61, code: "ESW 725", title: "Conflict Resolution and Peacebuilding in Environmental Contexts", unit: 3, status: "R", program_id: 4, level_id: 1, semester_id: 2 },
  //       { id: 62, code: "ESW 726", title: "Fundraising and Resource Mobilization for Community Projects", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 2 },
  //       { id: 63, code: "ESW 728", title: "Leadership and Governance in Community Development", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 2 },
  //       { id: 64, code: "ESW 799", title: "Field Practicum / Project", unit: 6, status: "C", program_id: 4, level_id: 1, semester_id: 2 },
      
  //     // MASTERS COURSES #################################################


  // // First Semester
  // { id: 65, code: "PWM 811", title: "Principles of Petroleum Waste Management", unit: 4, status: "C", program_id: 5, level_id: 1, semester_id: 1 },
  // { id: 66, code: "PWM 812", title: "Oil and Gas Production Waste Characterization", unit: 4, status: "C", program_id: 5, level_id: 1, semester_id: 1 },
  // { id: 67, code: "PWM 813", title: "Treatment and Disposal of Drilling Mud and Cuttings", unit: 4, status: "C", program_id: 5, level_id: 1, semester_id: 1 },
  // { id: 68, code: "PWM 814", title: "Environmental Impact Assessment in Oil and Gas", unit: 3, status: "R", program_id: 5, level_id: 1, semester_id: 1 },
  // { id: 69, code: "PWM 815", title: "Risk Assessment and Management in Petroleum Sector", unit: 2, status: "R", program_id: 5, level_id: 1, semester_id: 1 },
  // { id: 70, code: "PWM 816", title: "Petroleum Hydrocarbon Spill Management", unit: 3, status: "C", program_id: 5, level_id: 1, semester_id: 1 },
 
  // { id: 71, code: "PWM 819", title: "Seminar in Petroleum Waste Management", unit: 3, status: "C", program_id: 5, level_id: 1, semester_id: 1 },

  // // Second Semester
  // { id: 72, code: "PWM 821", title: "Remediation of Petroleum-Contaminated Sites", unit: 4, status: "C", program_id: 5, level_id: 1, semester_id: 2 },
  // { id: 73, code: "PWM 822", title: "Advanced Wastewater Treatment in Oil and Gas Operations", unit: 4, status: "C", program_id: 5, level_id: 1, semester_id: 2 },
  // { id: 74, code: "PWM 823", title: "Waste Minimization and Resource Recovery Techniques", unit: 3, status: "C", program_id: 5, level_id: 1, semester_id: 2 },
  // { id: 75, code: "PWM 824", title: "Environmental Regulations and Compliance in Oil & Gas", unit: 3, status: "R", program_id: 5, level_id: 1, semester_id: 2 },
  // { id: 76, code: "PWM 825", title: "Offshore Waste Management Practices", unit: 3, status: "R", program_id: 5, level_id: 1, semester_id: 2 },
  // { id: 77, code: "PWM 826", title: "Sustainable Practices in Petroleum Industry", unit: 3, status: "E", program_id: 5, level_id: 1, semester_id: 2 },
  // { id: 78, code: "PWM 828", title: "Leadership and Management in Petroleum Waste", unit: 3, status: "E", program_id: 5, level_id: 1, semester_id: 2 },
  // { id: 79, code: "PWM 899", title: "Project", unit: 6, status: "C", program_id: 5, level_id: 1, semester_id: 2 },



  { id: 31, code: "WM 728", title: "Environmental Monitoring and Reporting", unit: 3, status: "C", program_id: 2, level_id: 1, semester_id: 2, link: "https://meet.google.com/xge-ivcr-icy" },
  { id: 32, code: "WM 799", title: "Project", unit: 6, status: "C", program_id: 2, level_id: 1, semester_id: 2, link: "https://meet.google.com/shn-kveg-yho" },

  { id: 33, code: "EHM 711", title: "Introduction to Environmental Health", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 1, link: "https://meet.google.com/hyz-byeo-fis" },
  { id: 34, code: "EHM 712", title: "Principles of Toxicology and Human Health", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 1, link: "https://meet.google.com/tpe-swwf-hbh" },
  { id: 35, code: "EHM 713", title: "Water Quality Management and Control", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 1, link: "https://meet.google.com/jpn-fmjo-ped" },
  { id: 36, code: "EHM 714", title: "Air Quality Management and Control", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 1, link: "https://meet.google.com/hbo-vwvg-puq" },
  { id: 37, code: "EHM 715", title: "Occupational Health and Safety", unit: 3, status: "R", program_id: 3, level_id: 1, semester_id: 1, link: "https://meet.google.com/mjx-qitj-bbx" },
  { id: 38, code: "EHM 716", title: "Environmental Health Risk Assessment", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 1, link: "https://meet.google.com/ovq-aorx-yjh" },
  { id: 39, code: "EHM 718", title: "Fundamentals of Epidemiology and Biostatistics", unit: 3, status: "R", program_id: 3, level_id: 1, semester_id: 1, link: "https://meet.google.com/eti-snco-gos" },
  { id: 40, code: "EHM 719", title: "Seminar", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 1, link: "https://meet.google.com/wko-iaoz-fto" },

  { id: 41, code: "EHM 721", title: "Environmental Microbiology", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 2, link: "https://meet.google.com/gbp-yisx-fzi" },
  { id: 42, code: "EHM 722", title: "Food Safety and Hygiene", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 2, link: "https://meet.google.com/kua-vcpt-txj" },
  { id: 43, code: "EHM 723", title: "Vector Control and Pest Management", unit: 3, status: "E", program_id: 3, level_id: 1, semester_id: 2, link: "https://meet.google.com/vfa-unae-qpf" },
  { id: 44, code: "EHM 724", title: "Environmental Health Policy and Legislation", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 2, link: "https://meet.google.com/nzx-fdhg-vxa" },
  { id: 45, code: "EHM 725", title: "Waste Management in Environmental Health", unit: 3, status: "R", program_id: 3, level_id: 1, semester_id: 2, link: "https://meet.google.com/bya-ebfv-nyu" },
  { id: 46, code: "EHM 726", title: "Disaster Preparedness and Emergency Response", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 2, link: "https://meet.google.com/kui-hcqt-ttz" },
  { id: 47, code: "EHM 728", title: "Environmental Monitoring and Surveillance", unit: 3, status: "C", program_id: 3, level_id: 1, semester_id: 2, link: "https://meet.google.com/bkq-migf-jfq" },
  { id: 48, code: "EHM 799", title: "Project", unit: 6, status: "C", program_id: 3, level_id: 1, semester_id: 2, link: "https://meet.google.com/qat-nyev-zah" },

  { id: 49, code: "ESW 711", title: "Introduction to Environmental Social Work", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 1, link: "https://meet.google.com/qnb-uiue-xkh" },
  { id: 50, code: "ESW 712", title: "Community Development Theory and Practice", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 1, link: "https://meet.google.com/epo-vxmc-efj" },
  { id: 51, code: "ESW 713", title: "Environmental Justice and Advocacy", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 1, link: "https://meet.google.com/jfz-nwhh-fhr" },
  { id: 52, code: "ESW 714", title: "Sustainable Development Goals (SDGs) and Social Work", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 1, link: "https://meet.google.com/gsb-fcwn-dqw" },
  { id: 53, code: "ESW 715", title: "Social Research Methods and Data Analysis", unit: 3, status: "R", program_id: 4, level_id: 1, semester_id: 1, link: "https://meet.google.com/itr-nosr-sba" },
  { id: 54, code: "ESW 716", title: "Project Planning and Management in Community Settings", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 1, link: "https://meet.google.com/eef-bpsq-cno" },
  { id: 55, code: "ESW 718", title: "Gender, Environment, and Development", unit: 3, status: "E", program_id: 4, level_id: 1, semester_id: 1, link: "https://meet.google.com/ctb-jart-xuw" },
  { id: 56, code: "ESW 719", title: "Seminar in Environmental Social Work", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 1, link: "https://meet.google.com/ces-zfvq-xgv" },

  { id: 57, code: "ESW 721", title: "Social Work in Disaster and Emergency Situations", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 2, link: "https://meet.google.com/ymf-aqwq-hgp" },
  { id: 58, code: "ESW 722", title: "Environmental Policy and Community Advocacy", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 2, link: "https://meet.google.com/fey-csco-xuz" },
  { id: 59, code: "ESW 723", title: "Public Health and Community Well-being", unit: 3, status: "E", program_id: 4, level_id: 1, semester_id: 2, link: "https://meet.google.com/gyc-gzow-wni" },
  { id: 60, code: "ESW 724", title: "Environmental Education and Awareness", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 2, link: "https://meet.google.com/gxc-jpfs-pgw" },
  { id: 61, code: "ESW 725", title: "Conflict Resolution and Peacebuilding in Environmental Contexts", unit: 3, status: "R", program_id: 4, level_id: 1, semester_id: 2, link: "https://meet.google.com/ojy-wyqy-wxh" },
  { id: 62, code: "ESW 726", title: "Fundraising and Resource Mobilization for Community Projects", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 2, link: "https://meet.google.com/wbz-zdmj-vsd" },
  { id: 63, code: "ESW 728", title: "Leadership and Governance in Community Development", unit: 3, status: "C", program_id: 4, level_id: 1, semester_id: 2, link: "https://meet.google.com/fyp-athg-uun" },
  { id: 64, code: "ESW 799", title: "Field Practicum / Project", unit: 6, status: "C", program_id: 4, level_id: 1, semester_id: 2, link: "https://meet.google.com/dtm-verq-csk" },

  { id: 65, code: "PWM 811", title: "Principles of Petroleum Waste Management", unit: 4, status: "C", program_id: 5, level_id: 1, semester_id: 1, link: "https://meet.google.com/fex-iqvr-cbd" },
  { id: 66, code: "PWM 812", title: "Oil and Gas Production Waste Characterization", unit: 4, status: "C", program_id: 5, level_id: 1, semester_id: 1, link: "https://meet.google.com/zpv-uvzz-geb" },
  { id: 67, code: "PWM 813", title: "Treatment and Disposal of Drilling Mud and Cuttings", unit: 4, status: "C", program_id: 5, level_id: 1, semester_id: 1, link: "https://meet.google.com/mnp-asoz-mbe" },
  { id: 68, code: "PWM 814", title: "Environmental Impact Assessment in Oil and Gas", unit: 3, status: "R", program_id: 5, level_id: 1, semester_id: 1, link: "https://meet.google.com/ujs-jyve-tss" },
  { id: 69, code: "PWM 815", title: "Risk Assessment and Management in Petroleum Sector", unit: 2, status: "R", program_id: 5, level_id: 1, semester_id: 1, link: "https://meet.google.com/hji-ifnk-dbk" },
  { id: 70, code: "PWM 816", title: "Petroleum Hydrocarbon Spill Management", unit: 3, status: "C", program_id: 5, level_id: 1, semester_id: 1, link: "https://meet.google.com/pkh-hnyc-zwq" },
  { id: 71, code: "PWM 819", title: "Seminar in Petroleum Waste Management", unit: 3, status: "C", program_id: 5, level_id: 1, semester_id: 1, link: "https://meet.google.com/bbh-hohd-ffn" },

  { id: 72, code: "PWM 821", title: "Remediation of Petroleum-Contaminated Sites", unit: 4, status: "C", program_id: 5, level_id: 1, semester_id: 2, link: "https://meet.google.com/sqc-qktp-cxs" },
  { id: 73, code: "PWM 822", title: "Advanced Wastewater Treatment in Oil and Gas Operations", unit: 4, status: "C", program_id: 5, level_id: 1, semester_id: 2, link: "https://meet.google.com/gmb-dfvj-cwh" },
  { id: 74, code: "PWM 823", title: "Waste Minimization and Resource Recovery Techniques", unit: 3, status: "C", program_id: 5, level_id: 1, semester_id: 2, link: "https://meet.google.com/dcx-jffc-qik" },
  { id: 75, code: "PWM 824", title: "Environmental Regulations and Compliance in Oil & Gas", unit: 3, status: "R", program_id: 5, level_id: 1, semester_id: 2, link: "https://meet.google.com/avx-erhg-qzn" },
  { id: 76, code: "PWM 825", title: "Offshore Waste Management Practices", unit: 3, status: "R", program_id: 5, level_id: 1, semester_id: 2, link: "https://meet.google.com/zod-cxyo-cra" },
  { id: 77, code: "PWM 826", title: "Sustainable Practices in Petroleum Industry", unit: 3, status: "E", program_id: 5, level_id: 1, semester_id: 2, link: "https://meet.google.com/kqb-kfin-cqh" },
  { id: 78, code: "PWM 828", title: "Leadership and Management in Petroleum Waste", unit: 3, status: "E", program_id: 5, level_id: 1, semester_id: 2, link: "https://meet.google.com/uxh-hzxf-cbx" },
  { id: 79, code: "PWM 899", title: "Project", unit: 6, status: "C", program_id: 5, level_id: 1, semester_id: 2, link: "https://meet.google.com/huw-nhaj-yuu" },



  
    // // First Semester
    // { id: 80, code: "WM 811", title: "Advanced Principles of Waste Management", unit: 4, status: "C", program_id: 6, level_id: 1, semester_id: 1 },
    // { id: 81, code: "WM 812", title: "Waste Characterization and Quantification", unit: 4, status: "C", program_id: 6, level_id: 1, semester_id: 1 },
    // { id: 82, code: "WM 813", title: "Waste Collection and Transport Systems", unit: 4, status: "C", program_id: 6, level_id: 1, semester_id: 1 },
    // { id: 83, code: "WM 814", title: "Waste Treatment Technologies", unit: 4, status: "C", program_id: 6, level_id: 1, semester_id: 1 },
    // { id: 84, code: "WM 815", title: "Environmental Impact Assessment", unit: 4, status: "R", program_id: 6, level_id: 1, semester_id: 1 },
    // { id: 85, code: "WM 816", title: "Policy and Regulations in Waste Management", unit: 3, status: "C", program_id: 6, level_id: 1, semester_id: 1 },
    // { id: 86, code: "WM 819", title: "Seminar", unit: 3, status: "C", program_id: 6, level_id: 1, semester_id: 1 },
  
    // // Second Semester
    // { id: 87, code: "WM 821", title: "Hazardous Waste Management", unit: 4, status: "C", program_id: 6, level_id: 1, semester_id: 2 },
    // { id: 88, code: "WM 822", title: "Recycling and Resource Recovery Technologies", unit: 4, status: "C", program_id: 6, level_id: 1, semester_id: 2 },
    // { id: 89, code: "WM 823", title: "Waste-to-Energy Technologies", unit: 4, status: "C", program_id: 6, level_id: 1, semester_id: 2 },
    // { id: 90, code: "WM 824", title: "Sustainable Waste Management Practices", unit: 3, status: "R", program_id: 6, level_id: 1, semester_id: 2 },
    // { id: 91, code: "WM 825", title: "Environmental Health and Waste Management", unit: 3, status: "E", program_id: 6, level_id: 1, semester_id: 2 },
    // { id: 92, code: "WM 826", title: "Advanced Wastewater Treatment", unit: 3, status: "E", program_id: 6, level_id: 1, semester_id: 2 },
    // { id: 93, code: "WM 828", title: "Leadership and Management in Waste Projects", unit: 3, status: "E", program_id: 6, level_id: 1, semester_id: 2 },
    // { id: 94, code: "WM 899", title: "Project", unit: 6, status: "C", program_id: 6, level_id: 1, semester_id: 2 }, 
  
  


    
    //   // First Semester
    //   { id: 95, code: "ESW 811", title: "Introduction to Environmental Social Work", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 1 },
    //   { id: 96, code: "ESW 812", title: "Community Engagement and Participatory Development", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 1 },
    //   { id: 97, code: "ESW 813", title: "Environmental Justice and Human Rights", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 1 },
    //   { id: 98, code: "ESW 814", title: "Social Work Ethics and Professional Practice", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 1 },
    //   { id: 99, code: "ESW 815", title: "Methods and Tools for Community-Based Research", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 1 },
    //   { id: 100, code: "ESW 816", title: "Disaster Risk Reduction and Management", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 1 },
    //   { id: 128, code: "ESW 819", title: "Seminar", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 1 },
      
  
    //   // Second Semester
    //   { id: 101, code: "ESW 721", title: "Social Policy and Advocacy in Environmental Contexts", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 2 },
    //   { id: 102, code: "ESW 722", title: "Sustainable Community Development Practices", unit: 3, status: "R", program_id: 7, level_id: 1, semester_id: 2 },
      
      
     
  { id: 80, code: "WM 811", title: "Advanced Principles of Waste Management", unit: 4, status: "C", program_id: 6, level_id: 1, semester_id: 1, link: "https://meet.google.com/hbh-yvmt-cti" },
  { id: 81, code: "WM 812", title: "Waste Characterization and Quantification", unit: 4, status: "C", program_id: 6, level_id: 1, semester_id: 1, link: "https://meet.google.com/zbf-vcgn-aum" },
  { id: 82, code: "WM 813", title: "Waste Collection and Transport Systems", unit: 4, status: "C", program_id: 6, level_id: 1, semester_id: 1, link: "https://meet.google.com/vpv-hqdp-wyj" },
  { id: 83, code: "WM 814", title: "Waste Treatment Technologies", unit: 4, status: "C", program_id: 6, level_id: 1, semester_id: 1, link: "https://meet.google.com/osu-sjzq-qda" },
  { id: 84, code: "WM 815", title: "Environmental Impact Assessment", unit: 4, status: "R", program_id: 6, level_id: 1, semester_id: 1, link: "https://meet.google.com/wyc-qpcf-vgf" },
  { id: 85, code: "WM 816", title: "Policy and Regulations in Waste Management", unit: 3, status: "C", program_id: 6, level_id: 1, semester_id: 1, link: "https://meet.google.com/rsx-yjkb-dyv" },
  { id: 86, code: "WM 819", title: "Seminar", unit: 3, status: "C", program_id: 6, level_id: 1, semester_id: 1, link: "https://meet.google.com/zzc-saxk-ssv" },

  { id: 87, code: "WM 821", title: "Hazardous Waste Management", unit: 4, status: "C", program_id: 6, level_id: 1, semester_id: 2, link: "https://meet.google.com/kwd-dxot-rtq" },
  { id: 88, code: "WM 822", title: "Recycling and Resource Recovery Technologies", unit: 4, status: "C", program_id: 6, level_id: 1, semester_id: 2, link: "https://meet.google.com/isu-dyuy-nuu" },
  { id: 89, code: "WM 823", title: "Waste-to-Energy Technologies", unit: 4, status: "C", program_id: 6, level_id: 1, semester_id: 2, link: "https://meet.google.com/fwh-vpew-aci" },
  { id: 90, code: "WM 824", title: "Sustainable Waste Management Practices", unit: 3, status: "R", program_id: 6, level_id: 1, semester_id: 2, link: "https://meet.google.com/xzp-gary-hfu" },
  { id: 91, code: "WM 825", title: "Environmental Health and Waste Management", unit: 3, status: "E", program_id: 6, level_id: 1, semester_id: 2, link: "https://meet.google.com/wni-ikhn-szj" },
  { id: 92, code: "WM 826", title: "Advanced Wastewater Treatment", unit: 3, status: "E", program_id: 6, level_id: 1, semester_id: 2, link: "https://meet.google.com/npd-yqyy-kuw" },
  { id: 93, code: "WM 828", title: "Leadership and Management in Waste Projects", unit: 3, status: "E", program_id: 6, level_id: 1, semester_id: 2, link: "https://meet.google.com/wtr-wviv-rji" },
  { id: 94, code: "WM 899", title: "Project", unit: 6, status: "C", program_id: 6, level_id: 1, semester_id: 2, link: "https://meet.google.com/ciw-vucs-bep" },

  { id: 95, code: "ESW 811", title: "Introduction to Environmental Social Work", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 1, link: "https://meet.google.com/awj-fkpc-qwq" },
  { id: 96, code: "ESW 812", title: "Community Engagement and Participatory Development", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 1, link: "https://meet.google.com/rhh-otox-dbs" },
  { id: 97, code: "ESW 813", title: "Environmental Justice and Human Rights", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 1, link: "https://meet.google.com/cvq-ezkm-nmx" },
  { id: 98, code: "ESW 814", title: "Social Work Ethics and Professional Practice", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 1, link: "https://meet.google.com/det-krxe-xvs" },
  { id: 99, code: "ESW 815", title: "Methods and Tools for Community-Based Research", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 1, link: "https://meet.google.com/aik-qsfv-sad" },
  { id: 100, code: "ESW 816", title: "Disaster Risk Reduction and Management", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 1, link: "https://meet.google.com/taa-zhci-pfh" },
  { id: 128, code: "ESW 819", title: "Seminar", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 1, link: "https://meet.google.com/hcx-ooum-nbc" },

  { id: 101, code: "ESW 721", title: "Social Policy and Advocacy in Environmental Contexts", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 2, link: "https://meet.google.com/mcp-xkmm-ctk" },
  { id: 102, code: "ESW 722", title: "Sustainable Community Development Practices", unit: 3, status: "R", program_id: 7, level_id: 1, semester_id: 2, link: "https://meet.google.com/jft-sbsn-mjj" },

 
      
      // kkmlklk
      // { id: 103, code: "ESW 723", title: "Health and Environmental Interventions in Communities", unit: 3, status: "E", program_id: 7, level_id: 1, semester_id: 2 },
      // { id: 104, code: "ESW 724", title: "Program Planning and Evaluation for Social Work", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 2 },
      // { id: 105, code: "ESW 725", title: "Advanced Research Methods in Environmental Social Work", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 2 },
      // { id: 106, code: "ESW 726", title: "Practicum: Community-Based Environmental Project", unit: 6, status: "C", program_id: 7, level_id: 1, semester_id: 2 },
      // { id: 107, code: "ESW 799", title: "Capstone Project in Environmental Social Work", unit: 6, status: "C", program_id: 7, level_id: 1, semester_id: 2 },
    
    
      
      //   // First Semester
      //   { id: 108, code: "EHM 811", title: "Principles of Environmental Health", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 1 },
      //   { id: 109, code: "EHM 812", title: "Epidemiology and Public Health", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 1 },
      //   { id: 110, code: "EHM 813", title: "Environmental Toxicology and Risk Assessment", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 1 },
      //   { id: 111, code: "EHM 814", title: "Environmental Policy and Regulation", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 1 },
      //   { id: 112, code: "EHM 815", title: "Health Impact Assessment", unit: 3, status: "R", program_id: 8, level_id: 1, semester_id: 1 },
      //   { id: 113, code: "EHM 816", title: "Environmental Health Laboratory Techniques", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 1 },
      //   { id: 114, code: "EHM 819", title: "Seminar in Environmental Health Issues", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 1 },
      
      //   // Second Semester
      //   { id: 115, code: "EHM 821", title: "Occupational Health and Safety", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 2 },
      //   { id: 116, code: "EHM 822", title: "Water, Sanitation, and Hygiene (WASH) Management", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 2 },
      //   { id: 117, code: "EHM 823", title: "Air Quality Management and Control", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 2 },
      //   { id: 118, code: "EHM 824", title: "Waste Management and Pollution Control", unit: 3, status: "R", program_id: 8, level_id: 1, semester_id: 2 },
      //   { id: 119, code: "EHM 825", title: "Advanced Geographic Information Systems (GIS) in Health", unit: 3, status: "E", program_id: 8, level_id: 1, semester_id: 2 },
      //   { id: 120, code: "EHM 826", title: "Climate Change and Health", unit: 3, status: "E", program_id: 8, level_id: 1, semester_id: 2 },
      //   { id: 121, code: "EHM 899", title: "Research Project", unit: 6, status: "C", program_id: 8, level_id: 1, semester_id: 2 },


      //   {id:122, code:"WM 818", title:"Environmental Politics, Governance, and Social Innovation"},
      //   {id:123, code:"PWM 818", title:"Environmental Politics, Governance, and Social Innovation"},
      //   {id:124, code:"ESW 818", title:"Environmental Politics, Governance, and Social Innovation"},
      //   {id:125, code:"EHM 818", title:"Environmental Politics, Governance, and Social Innovation"},
      //   {id:126, code:"WM 833", title:"Artificial Intelligence in Waste Management"},
      //   {id:127, code:"PWM 833", title:"Artificial intelligent in petroleum waste management"},
      // // id 128 is already used aboe
      


 { id: 103, code: "ESW 723", title: "Health and Environmental Interventions in Communities", unit: 3, status: "E", program_id: 7, level_id: 1, semester_id: 2, link: "https://meet.google.com/cym-vzyo-bbd" },
{ id: 104, code: "ESW 724", title: "Program Planning and Evaluation for Social Work", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 2, link: "https://meet.google.com/qon-xjwu-fcg" },
{ id: 105, code: "ESW 725", title: "Advanced Research Methods in Environmental Social Work", unit: 3, status: "C", program_id: 7, level_id: 1, semester_id: 2, link: "https://meet.google.com/kvc-ifyq-wfy" },
{ id: 106, code: "ESW 726", title: "Practicum: Community-Based Environmental Project", unit: 6, status: "C", program_id: 7, level_id: 1, semester_id: 2, link: "https://meet.google.com/mkg-azne-ebt" },
{ id: 107, code: "ESW 799", title: "Capstone Project in Environmental Social Work", unit: 6, status: "C", program_id: 7, level_id: 1, semester_id: 2, link: "https://meet.google.com/mmi-ewju-xet" },

{ id: 108, code: "EHM 811", title: "Principles of Environmental Health", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 1, link: "https://meet.google.com/sfq-oydi-eki" },
{ id: 109, code: "EHM 812", title: "Epidemiology and Public Health", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 1, link: "https://meet.google.com/stx-nmcj-uap" },
{ id: 110, code: "EHM 813", title: "Environmental Toxicology and Risk Assessment", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 1, link: "https://meet.google.com/jss-ytof-exc" },
{ id: 111, code: "EHM 814", title: "Environmental Policy and Regulation", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 1, link: "https://meet.google.com/exz-pgjt-mru" },
{ id: 112, code: "EHM 815", title: "Health Impact Assessment", unit: 3, status: "R", program_id: 8, level_id: 1, semester_id: 1, link: "https://meet.google.com/zyw-afwp-zuq" },
{ id: 113, code: "EHM 816", title: "Environmental Health Laboratory Techniques", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 1, link: "https://meet.google.com/bcu-thfu-vng" },
{ id: 114, code: "EHM 819", title: "Seminar in Environmental Health Issues", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 1, link: "https://meet.google.com/eia-ngfe-qpv" },

{ id: 115, code: "EHM 821", title: "Occupational Health and Safety", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 2, link: "https://meet.google.com/zfc-aqga-brj" },
{ id: 116, code: "EHM 822", title: "Water, Sanitation, and Hygiene (WASH) Management", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 2, link: "https://meet.google.com/ecc-rypz-kaz" },
{ id: 117, code: "EHM 823", title: "Air Quality Management and Control", unit: 3, status: "C", program_id: 8, level_id: 1, semester_id: 2, link: "https://meet.google.com/dyt-qpxi-ont" },
{ id: 118, code: "EHM 824", title: "Waste Management and Pollution Control", unit: 3, status: "R", program_id: 8, level_id: 1, semester_id: 2, link: "https://meet.google.com/ovz-firv-isd" },
{ id: 119, code: "EHM 825", title: "Advanced Geographic Information Systems (GIS) in Health", unit: 3, status: "E", program_id: 8, level_id: 1, semester_id: 2, link: "https://meet.google.com/fna-ftsi-vyt" },
{ id: 120, code: "EHM 826", title: "Climate Change and Health", unit: 3, status: "E", program_id: 8, level_id: 1, semester_id: 2, link: "https://meet.google.com/knb-btnm-qcp" },
{ id: 121, code: "EHM 899", title: "Research Project", unit: 6, status: "C", program_id: 8, level_id: 1, semester_id: 2, link: "https://meet.google.com/ruq-chqe-ogw" },

{ id: 122, code: "WM 818", title: "Environmental Politics, Governance, and Social Innovation", link: "https://meet.google.com/swb-hfme-snd" },
{ id: 123, code: "PWM 818", title: "Environmental Politics, Governance, and Social Innovation", link: "https://meet.google.com/uur-zwca-hsi" },
{ id: 124, code: "ESW 818", title: "Environmental Politics, Governance, and Social Innovation", link: "https://meet.google.com/sky-xxcs-xqq" },
{ id: 125, code: "EHM 818", title: "Environmental Politics, Governance, and Social Innovation", link: "https://meet.google.com/huy-oetf-zwh" },
{ id: 126, code: "WM 833", title: "Artificial Intelligence in Waste Management", link: "https://meet.google.com/vns-qqqb-sba" },
{ id: 127, code: "PWM 833", title: "Artificial intelligent in petroleum waste management", link: "https://meet.google.com/hdu-yufu-vps" }



];

//NEVER CHANGE THE SEQUENCE OR IT WILL CHANGE ALOT
const categories = [
  {id:1, name:"Assignment"},
  {id:2, name:"Quiz / Assessment-Test"},
  {id:3, name:"Exam"}
]



  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('profile');

 const handleMenuClick = (menu) => {
    window.scroll(0,0);
    setActiveMenu(menu);
    setMenuOpen(false); // Close menu on mobile when a menu item is clicked
  };

const [dhb, setDhb]=useState(true)

  return (
    <Context.Provider value={{adminToken,setAdminToken,admin,setAdmin,adminMenu,
    setAdminMenu,trackingID,setTrackingID,
    programs, levels, semesters, courses, categories,
    menuOpen, setMenuOpen, activeMenu,setActiveMenu,handleMenuClick,dhb, setDhb}}>

        {children}
    </Context.Provider>
      

  )
}

export default ContextProvider





// database 
// pw: cwmsr@fupre2025
// User “cwmsrfuprecom_cwmsrfuprecom” was added to the database “cwmsrfuprecom_cwmsrfuprecom”.



// auth o client id
// 547827396763-p5m55vd5rpu8vpqf77fiisj4u530de4j.apps.googleusercontent.com



// zoom production
// client id:  j1matrTkRzOoOYlVjXpfIA
// client secret: xidN4zuK5shmd8FQtNeyxNvsLt2wnQ55


// secrete token: JCT6ppt3TvCK_1ip7cPvTw
// erification token : LSSsgK8tRsuI0kHzgZruKg








// send mail .php

// text/x-generic send_mail.php ( PHP script, ASCII text, with CRLF line terminators )
// <?php
// // api/send_mail.php
// error_reporting(E_ALL);
// ini_set('display_errors', 0);
// ini_set('log_errors', 1);
// ini_set('error_log', __DIR__ . '/mail_error.log');

// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: POST, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type');
// header('Content-Type: application/json');

// // No-cache
// header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
// header("Pragma: no-cache");
// header("Expires: 0");

// if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit(); }

// // include config
// $configPath = __DIR__ . '/config.php';
// if (!file_exists($configPath)) {
//     error_log("Config file not found at $configPath");
//     echo json_encode(['success' => false, 'error' => 'Server configuration error']);
//     exit();
// }
// include $configPath;

// // Read JSON
// $input = json_decode(file_get_contents('php://input'), true);

// $from_name  = isset($input['from_name']) ? trim($input['from_name']) : '';
// $from_email = isset($input['from_email']) ? trim($input['from_email']) : '';
// $to_name    = isset($input['to_name']) ? trim($input['to_name']) : '';
// $to_email   = isset($input['to_email']) ? trim($input['to_email']) : '';
// $subject    = isset($input['subject']) ? trim($input['subject']) : '';
// $body       = isset($input['body']) ? trim($input['body']) : '';
// $cc_list    = isset($input['cc']) && is_array($input['cc']) ? $input['cc'] : [];

// // Basic validation
// if (!$from_email || !$to_email || !$subject || !$body) {
//     echo json_encode(['success' => false, 'error' => 'Missing required fields.']);
//     exit();
// }
// if (!filter_var($from_email, FILTER_VALIDATE_EMAIL) || !filter_var($to_email, FILTER_VALIDATE_EMAIL)) {
//     echo json_encode(['success' => false, 'error' => 'Invalid email address.']);
//     exit();
// }

// // Format CC as string
// $cc_string = '';
// if (!empty($cc_list)) {
//     $cc_sanitized = array_map(fn($e) => filter_var(trim($e), FILTER_SANITIZE_EMAIL), $cc_list);
//     $cc_valid = array_filter($cc_sanitized, fn($e) => filter_var($e, FILTER_VALIDATE_EMAIL));
//     $cc_string = implode(',', $cc_valid);
// }

// $conn->begin_transaction();

// try {
//     // 1) Insert into sent table
//     $stmtSent = $conn->prepare("
//         INSERT INTO sent (from_name, from_email, to_name, to_email, subject, body, cc) 
//         VALUES (?, ?, ?, ?, ?, ?, ?)
//     ");
//     if (!$stmtSent) throw new Exception("Prepare failed (sent): " . $conn->error);

//     if (!$stmtSent->bind_param("sssssss", $from_name, $from_email, $to_name, $to_email, $subject, $body, $cc_string)) {
//         throw new Exception("Bind failed (sent): " . $stmtSent->error);
//     }

//     if (!$stmtSent->execute()) throw new Exception("Execute failed (sent): " . $stmtSent->error);

//     $sentId = $stmtSent->insert_id;
//     $stmtSent->close();

//     // 2) Insert into inbox table (recipient)
//     $folder = 'inbox';
//     $is_read = 0;
//     $attachments = NULL;

//     $stmtInbox = $conn->prepare("
//         INSERT INTO inbox (from_name, from_email, to_email, subject, body, cc, is_read, folder, attachments) 
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//     ");
//     if (!$stmtInbox) throw new Exception("Prepare failed (inbox): " . $conn->error);

//     if (!$stmtInbox->bind_param("ssssssiss", $from_name, $from_email, $to_email, $subject, $body, $cc_string, $is_read, $folder, $attachments)) {
//         throw new Exception("Bind failed (inbox): " . $stmtInbox->error);
//     }

//     if (!$stmtInbox->execute()) throw new Exception("Execute failed (inbox): " . $stmtInbox->error);

//     $inboxId = $stmtInbox->insert_id;
//     $stmtInbox->close();

//     $conn->commit();

//     echo json_encode([
//         'success' => true,
//         'message' => 'Message sent and saved with CC.',
//         'sent_id' => $sentId,
//         'inbox_id' => $inboxId,
//         'cc' => $cc_string
//     ]);
// } catch (Exception $e) {
//     $conn->rollback();
//     error_log("Send mail failed: " . $e->getMessage());
//     echo json_encode(['success' => false, 'error' => 'Failed to send message.']);
// }

// $conn->close();