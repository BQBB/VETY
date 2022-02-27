import { ScheduleComponent, Week, Inject, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
import { useRef } from 'react';
import '../assets/css/scheduler.css'
import useSnack from '../hooks/useSnack';
import useAuth from '../hooks/useAuth';



const Scheduler = (props)=> {
    const { user } = useAuth()
    let scheduleObj = useRef({});
    let data = props.data
    const { error, success } = useSnack()

    const onPopup = (args) => {
      if(!props.canAdd) {
        return args.cancel = true
      }

      if(args.type==='Editor') {
          //return args.cancel = true
          //args.element = document.querySelector('div.e-quick-popup-wrapper.e-lib e-popup.e-control.e-popup-open')
         
      }
      args.data.EndTime.setHours(args.data.StartTime.getHours()+1)
      args.data.EndTime.setMinutes(0)
     
      
    }

    const editorTemplate = (prop)=> {
      return (prop !== undefined ? 
      <div className='p-4'>
        <div className="e-cell-header e-popup-header">
        <div className="e-header-icon-wrapper">
          <button id="close" className="e-close e-close-icon e-icons text-vred" title="Close" onClick={buttonClickActions}/>
        </div>
      </div>
      <div className="e-cell-content e-template">
                            <form className="e-schedule-form">
                              <div>
                                <p className='text-vsm sm:text-base text-black' style={{textAlign: 'right'}}> سيتم الحجز باسم : {(user.profile.first_name+" "+user.profile.last_name).trim()}</p>
                                {/* <input className="subject e-field e-input" type="text" name="Subject" placeholder="Title"/> */}
                              </div>
                            </form>
                          </div>
      <div className="e-cell-footer">
                              <div className="right-button">
                                <button id="add" className="e-event-create table text-base sm:text-lg mr-auto text-vblue" title="Add" onClick={buttonClickActions}> تأكيد الحجز </button>
                              </div>
                            </div>
      </div> : <div></div>)
    }

    const buttonClickActions = (e) => {
      let eventData = {};
      const action = e.target.id;
      const getSlotData = () => {
          const cellDetails = scheduleObj.getCellDetails(scheduleObj.getSelectedElements());
          const eventData = scheduleObj.eventWindow.getObjectFromFormData("e-quick-popup-wrapper");
          const addObj = {};
          addObj.Id = scheduleObj.getEventMaxID();
          addObj.Subject = (user.profile.first_name+" "+user.profile.last_name).trim();
          addObj.StartTime = new Date(+cellDetails.startTime.setMinutes(0))
          addObj.EndTime = new Date(+cellDetails.startTime.setMinutes(60))
          addObj.Location = eventData.Location;
          return addObj;
      };
      switch (action) {
          case "add":
              eventData = getSlotData();
              let _date = new Date(eventData.StartTime);
              _date = `${_date.getFullYear()}-${_date.getMonth()+1}-${_date.getDate()} ${_date.getHours()}:00:00`;
               props.handleAppointments(_date).then(res => {
                if(!res || res.status !=201) {
                  throw new Error('err')
                }
                success('تم حجز موعد')
                scheduleObj.addEvent(eventData);
                props.addAppointments([...data,eventData])
            }).catch(err=> error('تاكد من سجل حجوزاتك'))
              break;
          case "edit":
          case "edit-series":
          case "delete":
          case "delete-series":
          case "more-details":
              break;
          default:
              break;
      }
      scheduleObj.closeEditor();
      scheduleObj.closeQuickInfoPopup();
    }
    
    const header = (props) => {
          return (<div>
                  {props.elementType === "cell" ? (<div className="e-cell-header e-popup-header">
                      <div className="e-header-icon-wrapper">
                        <button id="close" className="e-close e-close-icon e-icons" title="Close" onClick={buttonClickActions}/>
                      </div>
                    </div>) : (<div className="e-event-header e-popup-header">
                        <div className="e-header-icon-wrapper">
                          <button id="close" className="e-close e-close-icon e-icons" title="CLOSE" onClick={buttonClickActions}/>
                        </div>
                      </div>)}
                </div>);
    }
      
    const content = (props) => {
          return (<div>
                    {props.elementType === "cell" ? (<div className="e-cell-content e-template">
                        <form className="e-schedule-form">
                          <div>
                            <p className='text-vsm sm:text-base text-black' style={{textAlign: 'right'}}> سيتم الحجز باسم : {(user.profile.first_name+" "+user.profile.last_name).trim()}</p>
                            {/* <input className="subject e-field e-input" type="text" name="Subject" placeholder="Title"/> */}
                          </div>
                        </form>
                      </div>) : (<div className="e-event-content e-template">
                          <div className="e-subject-wrap">
                            {props.Subject !== undefined ? (<div className="subject">{props.Subject}</div>) : ("")}
                          </div>
                        </div>)}
                  </div>);
    }

    const footer = (props) => {
          return (<div>
                      {props.elementType === "cell" ? (<div className="e-cell-footer">
                          <div className="right-button">
                            <button id="add" className="e-event-create table text-base sm:text-lg" title="Add" onClick={buttonClickActions}> تأكيد الحجز </button>
                          </div>
                        </div>) : (<div className="e-event-footer">
                            
                          </div>)}
                    </div>);
    }
      

    return (
      <div style={{direction: 'ltr'}}>

      
      <ScheduleComponent ref={(schedule) => (scheduleObj = schedule)} width='100%' height='550px' eventSettings={{ dataSource: data}} allowDragAndDrop={false} allowResizing={false} popupOpen={onPopup} quickInfoTemplates={{header: header,content:content, footer: footer}} editorTemplate={editorTemplate}>
       
        <ViewsDirective>
          <ViewDirective option='Week' startHour={props.startHour || '07:00'} endHour={props.endHour || '18:00'}/>
        </ViewsDirective>

        
        <Inject services={[Week]}/>
      </ScheduleComponent>
      </div>
    )
}

export default Scheduler