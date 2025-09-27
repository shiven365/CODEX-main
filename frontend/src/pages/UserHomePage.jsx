import React ,{ useState } from 'react'
import UserNavBar from '../components/UserNavBar'
import CodeEditor from '../components/CodeEditor'
import ProfileModal from '../components/ProfileModal'
import CodeEditorSettingsModal from '../components/CodeEditorSettingsModal'


const UserHomePage = () => {
   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
   const [isCodeEditorSettingsModal, setIsCodeEditorSettingsModal] = useState(false);

  return (
    <>

        <UserNavBar 
           onProfileClick={() => setIsProfileModalOpen(true) }/>
        <CodeEditor  
           onCodeEditorSettingsClick={() => setIsCodeEditorSettingsModal(true) } />

        {isProfileModalOpen && <ProfileModal  onClose={() => setIsProfileModalOpen(false)} />} 
        {isCodeEditorSettingsModal && <CodeEditorSettingsModal  onClose={() => setIsCodeEditorSettingsModal(false)} />} 
    </>
  )
} 

export default UserHomePage