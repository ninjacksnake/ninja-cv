
import EducationService from "./EducationService";
import JobService from './JobService';
import ProfileService from './ProfileService';
import ProjectService from './Project.Service';



const ResumeService ={
    getProfileInfo: ({token, loggedUser}) => {
        if (token && loggedUser) {
            try {
                // console.log(token, loggedUser)
                const resumeInformation = Promise.all([ 
                    ProfileService.find({token, loggedUser}),
                    EducationService.find({token, loggedUser}),
                    JobService.find({token, loggedUser}),
                    ProjectService.find({token, loggedUser})
                ]);
                return resumeInformation;
                // console.log(resumeInformation)
            } catch (error) {
                console.log(error)
            }
        }else{
            
        }
            
    }
  


}

export default ResumeService;