import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AdminRoot from './components/Admin/AdminRoot';
import Dashboard from './components/Admin/modules/components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import { CarouselInputModalProvider } from './contexts/CarouselInputModalContext';
import { ModalProvider } from './contexts/ModalContext';
import PersonalInfo from './components/Admin/modules/components/PersonalInfo/PersonalInfo';
import Skills from './components/Admin/modules/components/Skills/Skills';
import ProjectsAndJobs from './components/Admin/modules/components/ProjectsAndJobs/ProjectsAndJobs';
import Socials from './components/Admin/modules/components/Socials/Socials';
import { AuthProvider } from './contexts/AuthContext';
import { JobsAndProjectsProvider } from './contexts/JobsAndProjectsContext';
import { JobInputModalProvider } from './contexts/JobInputModalContext';
import { ProjectInputModalProvider } from './contexts/ProjectInputModalContext';

function App() {
    return (
        <AuthProvider>
            <JobsAndProjectsProvider>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/admin/dashboard' element={(
                        <ProtectedRoute>
                            <AdminRoot>
                                <Dashboard />
                            </AdminRoot>
                        </ProtectedRoute>
                    )} />
                    <Route path='/admin/personal-info' element={(
                        <ProtectedRoute>
                            <AdminRoot>
                                <CarouselInputModalProvider>
                                    <ModalProvider>
                                        <PersonalInfo />
                                    </ModalProvider>
                                </CarouselInputModalProvider>
                            </AdminRoot>
                        </ProtectedRoute>
                    )} />
                    <Route path='/admin/skills' element={(
                        <ProtectedRoute>
                            <AdminRoot>
                                <Skills />
                            </AdminRoot>
                        </ProtectedRoute>
                    )} />
                    <Route path='/admin/projects-and-jobs' element={(
                        <ProtectedRoute>
                            <AdminRoot>
                                <ProjectInputModalProvider>
                                    <JobInputModalProvider>
                                        <ModalProvider>
                                            <ProjectsAndJobs />
                                        </ModalProvider>
                                    </JobInputModalProvider>
                                </ProjectInputModalProvider>
                            </AdminRoot>
                        </ProtectedRoute>
                    )} />
                    <Route path='/admin/social-media' element={(
                        <ProtectedRoute>
                            <AdminRoot>
                                <Socials />
                            </AdminRoot>
                        </ProtectedRoute>
                    )} />
                </Routes >
            </JobsAndProjectsProvider>
        </AuthProvider>
    );
}

export default App;
