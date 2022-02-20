import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ReportCard from '../components/cards/ReportCard'
import Container from '../components/Container'
import Grid from '../components/Grid'
import GridItem from '../components/GridItem'
import Loader from '../components/Loader'
import { PetService } from '../services/PetService'

const Reports = (props) => {
    const [count, setCount] = useState(6)
    const [reports, setReports] = useState([])
    const { id } = useParams()
    const [load ,setLoad] = useState(true)

    const handleRedirect = (path) => {
        props.history.push(path)
        return <Redirect to={path} />
    }
    useEffect(()=> {


            ((new PetService).getReports(id)).then(
                res => {
                    if(res.status != 200) {
                       
                        throw new Error('Error')
                    }

                    setReports([...res.data])
                    setLoad(false)
    
                }
            ).catch(err => setLoad(false))
    
    },[])
    return (
      <Container>
        {load ? (
          <Loader />
        ) : (
          <>
            <div className="flex gap-x-4 items-center mt-14">
              <Link to="/" className="text-vblue text-lg sm:text-vmd">
                الرئيسية
              </Link>
              <FontAwesomeIcon icon={faChevronLeft} className="text-vblue" />
              <p className="text-[#7c7c7c] text-lg sm:text-vmd">التقارير</p>
            </div>
            {reports.length > 0 ? (
              <Grid style="mt-10 gap-x-8 gap-y-4">
                {reports.map((report, i) => {
                  let d = new Date(report.created);
                  return (
                    <GridItem key={i} style="sm:col-span-6 md:col-span-4">
                      <ReportCard
                        description={report.description}
                        name={report.title}
                        clinic={report.clinic.clinic_name}
                        date={`${d.getDate()}/${
                          d.getMonth() + 1
                        }/${d.getFullYear()}`}
                      />
                    </GridItem>
                  );
                })}
              </Grid>
            ) : (
              <p>لاتتوفر تقارير في الوقت الحالي</p>
            )}
            {!(count > reports.length) && (
              <button
                className="text-white bg-vblue table mx-auto px-4 py-2 rounded-lg hover:shadow-md mt-14"
                onClick={() => setCount(count + 3)}
              >
                عرض المزيد
              </button>
            )}
          </>
        )}
      </Container>
    );
}

export default Reports
