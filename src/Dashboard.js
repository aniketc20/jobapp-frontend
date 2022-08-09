import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Dashboard = () => {
    const [selectedFile, setSelectedFile] = useState("");
	const [isFilePicked, setIsFilePicked] = useState(false);
    const hiddenFileInput = React.useRef(null);
    const [jobs, setJobs] = useState([])
    const [applyClick, setapplyClick] = useState("false")

    const handleClick = (event) => {
		hiddenFileInput.current.click();
	};

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        setSelectedFile(fileUploaded);
        console.log(selectedFile)
    };

    const applied = (appliedBy) => {
        var status = false
        appliedBy.forEach(element => {
            if(element.username===localStorage.getItem("username")){
                status = true
            }
        });
        return status
    }

    const accepted_candidates = (accepted) => {
        var status = false
        accepted.forEach(element => {
            if(element.username===localStorage.getItem("username")){
                status = true
            }
        });
        return status
    }

    const rejected_candidates = (accepted) => {
        var status = false
        accepted.forEach(element => {
            if(element.username===localStorage.getItem("username")){
                status = true
            }
        });
        return status
    }

    var apply = (jobId, desc) => {
        const formData = new FormData();
        console.log(selectedFile)
        if(selectedFile!=="") {
            formData.append(
                "resume",
                selectedFile,
                selectedFile.name
              );
        }
        formData.append("job_desc", desc)
        formData.append("applied_by", localStorage.getItem("username"))
        formData.append("job", jobId)
        axios.post("http://localhost:8000/user/apply/",
        formData,{
        headers: {
            Authorization: `token ${localStorage.getItem("token")}`,
        }})
        .then(response => {
            setapplyClick(jobId)
          console.log(response)
        })
        .catch(error => {
            alert("Please upload resume")
          console.log(error)
        })
    }

    var jobList = jobs.map(function(job){
        return (<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={job.id}>
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {job.posted_by}
                    </th>
                    <td className="py-4 px-6">{job.desc}</td>
                    <td className="py-4 px-6">
                        {applied(job.applied_by)==false && accepted_candidates(job.accepted_candidate)==false &&  rejected_candidates(job.rejected_candidate)==false ?
                        <button onClick={ () => {apply(job.id, job.desc);}} id={job.id} className='bg-blue-300 p-2 rounded text-black'>Apply</button>
                        :
                        accepted_candidates(job.accepted_candidate)===true ? 
                        'Accepted' :
                        rejected_candidates(job.rejected_candidate)===true ?
                        "Rejected":'Applied'
                        }
                    </td>
                    
                </tr>);
    })

    useEffect(() => {
        // Update the document title using the browser API
        // if(jobs.length) {
        //     return;
        //   }
        axios.get("http://localhost:8000/user/jobs/", {
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      }).then(response => {
        setJobs(response.data)
        console.log(response)
      })
    }, [applyClick]);

    return (
        <div className='overflow-x-auto relative'>
            <h1 className='text-l text-center p-2 flex items-center justify-between bg-wheat-300'>
                Hello {localStorage.getItem("username")}
                <div className='flex flex-col'>
                    <input type="file" name="file" style={{display:'none'}} onChange={handleChange} ref={hiddenFileInput} />
                    <button onClick={handleClick} className='bg-blue-300 rounded p-2 text-black w-64'> Upload Latest Resume </button>
                    {selectedFile!==undefined && selectedFile!=="" ? <span>Uploaded Resume: { selectedFile.name }</span> : ""}

                </div>
            </h1>            
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        <td colSpan = "3" className='text-lg font-bold text-center w-full'>List of Jobs available</td>
                    </tr>                    
                    <tr>
                    <th scope="col" className="py-3 px-6">Company</th>
                    <th scope="col" className="py-3 px-6">Job Description</th>
                    <th scope="col" className="py-3 px-6">Status</th>
                    {/* <th scope="col" className="py-3 px-6">Resume</th> */}
                    </tr>
                </thead>
                <tbody>
                    {jobList}
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard
