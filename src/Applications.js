import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Applications = () => {
    const [applications, setApplications] = useState([])
    const [applyClick, setapplyClick] = useState("false")
    const [hidden, setHidden] = useState(true)
    const [jd, setJD] = useState("");

    // const applied = (appliedBy) => {
    //     var status = false
    //     // appliedBy.forEach(element => {
    //     //     if(element.username==="aniket"){
    //     //         status = true
    //     //     }
    //     // });
    //     return status
    // }

    var postJob = () => {
        console.log(jd)
        axios.post("http://localhost:8000/user/createJob/",
        {
            "desc": jd,
            "posted_by": localStorage.getItem("username"),
        },{
        headers: {
            Authorization: `token ${localStorage.getItem("token")}`,
        }})
        .then(response => {
            console.log(response)
            setJD("")
            alert("Job Posted")
        })
        .catch(error => {
          console.log(error)
        })
    }

    var accept = (jobId, applicationId, applied_by) => {
        console.log(jobId, applicationId)
        axios.put("http://localhost:8000/user/update-applications/",
        {
            "applicationId": applicationId,
            "status": "accepted",
            "job":jobId,
            applied_by: applied_by
        },{
        headers: {
            Authorization: `token ${localStorage.getItem("token")}`,
        }})
        .then(response => {
            setapplyClick(jobId+applied_by)
            console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }

    var reject = (jobId, applicationId, applied_by) => {
        console.log(jobId, applicationId)
        axios.put("http://localhost:8000/user/update-applications/",
        {
            "applicationId": applicationId,
            "status": "rejected",
            "job":jobId,
            applied_by: applied_by
        },{
        headers: {
            Authorization: `token ${localStorage.getItem("token")}`,
        }})
        .then(response => {
            setapplyClick(jobId+applied_by)
            console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }

    var jobList = applications.map(function(application){
        return (<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={application.id}>
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {application.job.id}
                    </th>
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {application.job.desc}
                    </th>
                    <td className="py-4 px-6">
                        {application.status==='Applied' ? 
                            <>
                                <button onClick={ () => {accept(application.job.id, application.id, application.applied_by);}} id={application.id} className='mx-2 bg-green-300 p-2 rounded text-black'>Accept</button>
                                <button onClick={ () => {reject(application.job.id, application.id, application.applied_by);}} id={application.id} className='bg-red-300 p-2 rounded text-black'>Reject</button>
                            </>
                            : application.status==='rejected' ? "Rejected":"Accepted"}
                    </td>
                    <td className="py-4 px-6">
                        {application.applied_by}
                    </td>
                    <td className="py-4 px-6">
                        {application.resume!==null ? 
                        <a className='bg-blue-300 p-2 rounded text-black' href={ "http://127.0.0.1:8000" + application.resume}>
                        View Resume
                        </a>:
                        ""
                        }
                    </td>
                </tr>);
    })

    useEffect(() => {
        axios.get("http://localhost:8000/user/get-applications/", {
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
      }).then(response => {
        setApplications(response.data)
        console.log(response)
      })
    }, [applyClick]);
  return (
    <div>
        <div className='flex flex-col items-center'>
            <h1 className='text-l text-center p-2'>{localStorage.getItem("username")} Job Portal
            </h1>
            <button onClick={ () => setHidden(false)} className='mx-2 w-32 bg-green-300 p-2 rounded text-black' data-modal-toggle="defaultModal">Create Job</button>
        </div>

        <h1 className='text-l text-center p-6'>List of Candidates applied</h1>
        <div className='overflow-x-auto relative'>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                    <th scope="col" className="py-3 px-6">Job Id</th>
                    <th scope="col" className="py-3 px-6">Job Description</th>
                    <th scope="col" className="py-3 px-6">Accept/Reject</th>
                    <th scope="col" className="py-3 px-6">Applied By</th>
                    <th scope="col" className="py-3 px-6">Resume</th>
                    </tr>
                </thead>
                <tbody>
                    {jobList}
                </tbody>
            </table>
        </div>

<div id="defaultModal" tabIndex="-1" aria-hidden="true" className={(hidden ? 'hidden' : 'none' ) + " flex fixed overflow-y-auto overflow-x-hidden justify-center z-50 w-full md:inset-0 md:h-full"}>
    <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Post Job
                </h3>
                <button onClick={ () => setHidden(true)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-6 space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Job Description
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    <input
                    value={jd}
                    onChange={(e) => setJD(e.target.value)}
                    className='border border-slate-400 rounded w-full' />
                </p>
            </div>
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button onClick={ () => postJob()} data-modal-toggle="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post</button>
            </div>
        </div>
    </div>
</div>
    </div>
  )
}

export default Applications
