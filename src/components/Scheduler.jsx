import { ScheduleComponent, Week, Inject, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
import { useRef } from 'react';
import '../assets/css/scheduler.css'

const Scheduler = ()=> {
    let scheduleObj = useRef({});
    let data = [
      {
        Id: 1,
        Subject: 'Paris',
        StartTime: new Date(2022, 0, 21, 10, 0),
        EndTime: new Date(2022, 0, 21, 11, 0),
        IsAllDay: false
    }, {
        Id: 2,
        Subject: 'London',
        StartTime: new Date(2022, 0, 16, 12, 0),
        EndTime: new Date(2022, 0, 16, 13, 0),
        IsAllDay: false
    }
    ];
  

    const onPopup = (args) => {

      if(args.type==='Editor') {
          return args.cancel = true
      }
      args.data.EndTime.setHours(args.data.StartTime.getHours()+1)
      args.data.EndTime.setMinutes(0)
     
      
    }



    const buttonClickActions = (e) => {
      let eventData = {};
      const action = e.target.id;
      const getSlotData = () => {
          const cellDetails = scheduleObj.getCellDetails(scheduleObj.getSelectedElements());
          const eventData = scheduleObj.eventWindow.getObjectFromFormData("e-quick-popup-wrapper");
          const addObj = {};
          addObj.Id = scheduleObj.getEventMaxID();
          addObj.Subject = eventData.Subject.length > 0 ? eventData.Subject : "Add title";
          addObj.StartTime = new Date(+cellDetails.startTime.setMinutes(0))
          addObj.EndTime = new Date(+cellDetails.startTime.setMinutes(60))
          addObj.Location = eventData.Location;
          return addObj;
      };
      switch (action) {
          case "add":
              eventData = getSlotData();
              scheduleObj.addEvent(eventData);
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
                            <input className="subject e-field e-input" type="text" name="Subject" placeholder="Title"/>
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
                            <button id="add" className="e-event-create" title="Add" onClick={buttonClickActions}> Add </button>
                          </div>
                        </div>) : (<div className="e-event-footer">
                            
                          </div>)}
                    </div>);
    }
      

    return (
      <div style={{direction: 'ltr'}}>

      
      <ScheduleComponent ref={(schedule) => (scheduleObj = schedule)} width='100%' height='550px' eventSettings={{ dataSource: data}} allowDragAndDrop={false} allowResizing={false} popupOpen={onPopup} quickInfoTemplates={{header: header,content:content, footer: footer}}>
       
        <ViewsDirective>
          <ViewDirective option='Week' startHour='07:00' endHour='18:00'/>
        </ViewsDirective>

        
        <Inject services={[Week]}/>
      </ScheduleComponent>
      </div>
    )
}

export default Scheduler