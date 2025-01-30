import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-calender',
  templateUrl: './custom-calender.component.html',
  styleUrls: ['./custom-calender.component.css']
})
export class CustomCalenderComponent{
  // private initialized = false;

  // dateFilter = (date: Date): boolean => {
  //   // Remove the date 30 check since we want dots on all dates
  //   if (!this.initialized) {
  //     console.log("running addDotsToAllDates()")
  //     if(new Date(date).getDate() === 31)   
  //     this.addDotsToAllDates();
  //   }
  //   return true;
  // }

  // private addDotsToAllDates() {
  //   setTimeout(() => {
  //     const elements = document.getElementsByClassName('mat-calendar-body-cell');
  //     console.log("element",elements)
  //     for (let i = 0; i < elements.length; i++) {
  //       const element = elements[i] as HTMLElement;
  //       // Only add class to cells that contain dates
  //       if (element.innerText.trim().match(/\d+/)) {
  //         element.classList.add('date-with-dot');
  //       }
  //     }
  //     this.initialized = true;
  //   });
  // }

  // ngAfterViewInit() {
  //   // Initial setup when view is ready
  //   this.addDotsToAllDates();
  // }

  // monthSelected() {
  //   // Reset when month changes
  //   this.initialized = false;
  //   this.addDotsToAllDates();
  // }

  private initialized = false;

  // Add your appointment dates here
  appointments = [
    new Date('2025-01-01'),
    new Date('2025-01-20'),
    new Date('2025-01-25')
  ];

  dateFilter = (date: Date): boolean => {
    if (!this.initialized) {
      this.addDotsToAppointmentDates();
    }
    return true;
  }

  private addDotsToAppointmentDates() {
    setTimeout(() => {
      const elements = document.getElementsByClassName('mat-calendar-body-cell');
      // Get current displayed month and year from calendar header
      const headerElement = document.querySelector('.mat-calendar-period-button');
      const headerText = headerElement ? headerElement.textContent || '' : '';
      const [monthName, year] = headerText.split(' ');
  
      
      const monthNames = [
        'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
      ];
      
      const month = monthNames.indexOf(monthName);
  
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLElement;
        const dateText = element.innerText.trim();
  
        if (dateText.match(/\d+/)) {
          
          let currentDate = new Date();
          currentDate.setFullYear(parseInt(year));
          currentDate.setDate(parseInt(dateText));
          currentDate.setMonth(month); 
  
          // const formattedDate = currentDate.getFullYear() + '-' + 
          //   (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + 
          //   currentDate.getDate().toString().padStart(2, '0');
          
          const formattedDateObject = new Date(currentDate);
          console.log("formatedobject ", formattedDateObject.getDate())

          // Check if this date has an appointment
          const hasAppointment = this.appointments.some(appointmentDate => 
            appointmentDate.getDate() === formattedDateObject.getDate() &&
            appointmentDate.getMonth() === formattedDateObject.getMonth() &&
            appointmentDate.getFullYear() === formattedDateObject.getFullYear()
          );
  
          if (hasAppointment) {
            element.classList.add('date-with-dot');
          } else {
            element.classList.remove('date-with-dot');
          }
        }
      }
      this.initialized = true;
    });
  }
  
  ngAfterViewInit() {
    this.addDotsToAppointmentDates();
  }

  monthSelected() {
    this.initialized = false;
    this.addDotsToAppointmentDates();
  }
}