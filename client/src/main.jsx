import { StrictMode, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from "react-router-dom";

import ErrorPage from './routeComponents/root/errorElement.jsx'




// import {rootLoader} from './routeComponents/root/root.jsx'

// import {Root} from './routeComponents/root/root.jsx'                                                          


// import {Index} from "./routeComponents/index/index.jsx"                                                      
// import {BookLesson} from "./routeComponents/bookLesson/bookLesson.jsx"                                         
// import {bookLessonLoader} from "./routeComponents/bookLesson/bookLesson.jsx"

// import {Login} from "./routeComponents/login/login.jsx"                                                  
// import {loginAction} from "./routeComponents/login/login.jsx"

// import {SelectSignup} from "./routeComponents/signup/selectSignup.jsx"                                         

// import {Signup} from "./routeComponents/signup/signup.jsx"                                                       
// import {signupAction} from "./routeComponents/signup/signup.jsx"


// import {reviewsLoader} from "./reusableComponents/reviews/reviews.jsx"

// import {Protected} from "./routeComponents/protected/protected.jsx"                                           
// import {protectedLoader} from "./routeComponents/protected/protected.jsx"

import {reviewsLoader} from "./reusableComponents/reviews/reviews.jsx"

import {postEmailRequestAction, postReviewAction} from "./routeComponents/studentLessons/studentLessons.jsx"

import './i18n.js'

const router= createBrowserRouter([
  {
    path: "/",
    async lazy(){
      const {Root,rootLoader}= await import("./routeComponents/root/root.jsx")
      return {element: <Root/>, loader:rootLoader}
    },
    shouldRevalidate: () => true,         // it is used to fetch header params. it executes on every load because the session may have expired and thus the profile icon on the header may need to change.
    errorElement:<ErrorPage/>,

    children:[
      {
        errorElement:<ErrorPage/>,
        children:[
          {
            index:true,
            async lazy(){
              const { Index } = await import("./routeComponents/index/index.jsx")
          
              return {element:<Index/>}

            }
            
          },
          {  
            path: "bookLesson",
            async lazy(){
              const {BookLesson,bookLessonLoader}= await import("./routeComponents/bookLesson/bookLesson.jsx")
              return {element:<BookLesson/>, loader:bookLessonLoader}

            }
          },
          {
            path:"login",
            async lazy(){
              const {Login,loginAction}= await import("./routeComponents/login/login.jsx")
              return {element:<Login/>, action:loginAction}

            }
          },
          {
            path:"signupSelect",
            async lazy(){
              const {SelectSignup}= await import("./routeComponents/signup/selectSignup.jsx")
              return {element:<SelectSignup/>}

            }
          },
          {
            path:"signup/:account",
            async lazy(){
              const {Signup,signupAction}= await import("./routeComponents/signup/signup.jsx")
              return {element:<Signup/>,action:signupAction}

            }
          },
          {
            path:"instructorInfo/:instructorName/:instructorId",
            async lazy(){
              const {InstructorInfo,instructorInfoLoader}= await import("./routeComponents/instructorInfo/instructorInfo.jsx")
              return {element:<InstructorInfo/>,loader:instructorInfoLoader}

            },
            shouldRevalidate:({formAction})=>{
                         
              if(formAction=="/api/postEmailRequest"){
                // user is sending an email
                return false;
                }
            }
          },
          {  
            path: "overview",
            async lazy(){
              const {Overview,overViewLoader,overviewAction}= await import("./routeComponents/overview/overview.jsx")
              return {element:<Overview/>,loader:overViewLoader,action:overviewAction}

            }

          },
          {  
            path: "payment",
            async lazy(){
              const {Payment,paymentLoader,paymentAction}= await import("./routeComponents/payment/payment.jsx")
              return {element:<Payment/>,loader:paymentLoader,action:paymentAction}

            }

          },
          {
            path:"instructorMenu",
            async lazy(){
              const {InstructorMenu}= await import("./reusableComponents/instructorMenu/instructorMenu.jsx")
              return {element:<InstructorMenu/>}
            },
            children:[
              {
                path:"statistics",
                async lazy(){
                  const {Statistics,StatisticsLoader}= await import("./routeComponents/statistics/statistics.jsx")
                  return {element:<Statistics/>,loader:StatisticsLoader}
                },
              },
              {
                path:"instructorSchedule",
                async lazy(){
                  const {InstructorSchedule,instructorScheduleLoader,updateNoteAction}= await import("./routeComponents/instructorSchedule/instructorSchedule.jsx")
                  return {element:<InstructorSchedule/>,loader:instructorScheduleLoader,action:updateNoteAction}
                },
              },
              {
                path:"profile",
                async lazy(){
                  const {InstructorProfile,instructorProfileLoader,instructorProfileAction}= await import("./routeComponents/instructorProfile/instructorProfile.jsx")
                  return {element:<InstructorProfile/>,loader:instructorProfileLoader,action:instructorProfileAction}
                },
              },
              {
                path:"teachings",
                async lazy(){
                  const {InstructorTeachings,instructorTeachingsLoader,instructorTeachingsAction}= await import("./routeComponents/instructorTeachings/instructorTeachings.jsx")
                  return {element:<InstructorTeachings/>,loader:instructorTeachingsLoader,action:instructorTeachingsAction}
                },
              }
            ]
          },
          {
            path:"studentMenu",
            async lazy(){
              const {StudentMenu}= await import("./reusableComponents/studentMenu/studentMenu.jsx")
              return {element:<StudentMenu/>}
            },
            children:[
              {
                path:"profile",
                async lazy(){
                  const {StudentProfile,studentProfileLoader,studentProfileAction}= await import("./routeComponents/studentProfile/studentProfile.jsx")
                  return {element:<StudentProfile/>, loader:studentProfileLoader,action:studentProfileAction}
                },

              },
              {
                path:"lessons",
                async lazy(){
                  const {UpComingStudentLessons,UpComingStudentLessonsLoader,UpComingStudentLessonsAction}= await import("./routeComponents/studentLessons/studentLessons.jsx")
                  return {element:<UpComingStudentLessons/>,loader:UpComingStudentLessonsLoader,action:UpComingStudentLessonsAction}
                },
                shouldRevalidate:({
                  currentUrl,
                  nextUrl,
                  defaultShouldRevalidate,
                  actionResult,
                  formMethod,
                  formAction,
                  formEncType,
                  submission
                })=>{
                  // console.log(
                  //   currentUrl,
                  //   nextUrl,
                  //   defaultShouldRevalidate,
                  //   actionResult,
                  //   formMethod,
                  //   formAction,
                  //   formEncType,
                  //   submission)
                  
                  if(formAction=="/api/postEmailRequest" || formAction=="/api/postReview"){
                    // user is sending an email or posting a review
                    return false;
                  }

                  return true
                },
                children:[
                  {
                    path:"studentLessons",
                    async lazy(){
                      const {PreviousLessons,PreviousLessonsLoader} = await import("./routeComponents/studentLessons/studentLessons.jsx")
                      return {element:<PreviousLessons/>,loader:PreviousLessonsLoader}
                    },
                    shouldRevalidate:({formAction,actionResult})=>{
                      if(formAction=="/api/postEmailRequest" ){
                        // user is sending an email, child does not revalidate.
                        return false;
                      }

                      if(actionResult && actionResult.message?.startsWith("cancel")){
                        //user is cancelling a scheduled lesson
                        return true
                      }
          
                    }
                  }
                ]

              }
            ]
          }
        ]
      },
      {
        path:"api",
        children:[
            {
              path:"reviews",
              loader:reviewsLoader
            },
            {
              path:"postEmailRequest",
              action:postEmailRequestAction
            },
            {
              path:"postReview",
              action:postReviewAction
            },
        ]
        
      }
    ]
  }
])






// const router= createBrowserRouter([
//   {
//     path: "/",
//     element: <Root/>,
//     loader: rootLoader,
//     shouldRevalidate: () => true,
//     errorElement:<ErrorPage/>,

//     children:[
//       {
//         errorElement:<ErrorPage/>,
//         children:[
//           {
//             index:true,
//             element:<Index/>,
//             loader: reviewsLoader
            
//           },
//           {
//             path:"bookLesson/resort/:resort/dates/:dates/sport/:sport/members/:members",
//             element:<BookLesson/>,
//             loader:bookLessonLoader
//           },
//           {
//             path:"login",
//             element:<Login/>,
//             action:loginAction
//           },
//           {
//             path:"signupSelect",
//             element:<SelectSignup/>,
//           },
//           {
//             path:"signup/:account",
//             element:<Signup/>,
//             action:signupAction
//           },
//           {
//             path:"protected",
//             element:<Protected/>,
//             loader:protectedLoader
//           }
//         ]
//       }
//     ]
//   }
// ])


createRoot(document.getElementById('root')).render(
 <StrictMode>

      <RouterProvider router={router} />
 </StrictMode> 
)