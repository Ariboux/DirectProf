import { Nunito } from 'next/font/google'

import './globals.css'
import Navbar from './components/navbar/Navbar'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import TeacherRegisterModal from './components/modals/TeacherRegisterModal'
import Providers from './providers'
import TeacherLoginModal from './components/modals/TeacherLoginModal'
import getCurrentTeacher from './actions/getCurrentTeacher'
import CreateCourseModal from './components/modals/CreateCourseModal'
import getSubjects from './actions/getSubjects'

export const metadata = {
  title: 'DirectProf',
  description: 'DirectProf is a platform for direct-to-consumer education.',
}

const font = Nunito({
  subsets: ['latin']
})

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  const currentTeacher = await getCurrentTeacher();
  const subjects = await getSubjects();
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <TeacherRegisterModal />
          <TeacherLoginModal />
          <CreateCourseModal subjects={subjects} />
          <Navbar currentUser={currentUser} currentTeacher={currentTeacher} />
          <div className='pb-20 pt-24'>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
