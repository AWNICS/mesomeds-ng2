import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { SecurityService } from './security.service';
import { Group } from '../database/group';

@Injectable()
export class SharedService {

    private url: string;  // URL to access server
    private location: string;
    private speciality: string;
    private group: Group;
    private windowNotInFocus:Boolean;
    private windowNotVisible:Boolean;
    private doctorAddedGroupId:Object;
    private initialNavbarLoad:Boolean = true;
    private unreadMessageCount:number;

    constructor(
        private http: Http,
        private securityService: SecurityService
    ) {
        this.url = this.securityService.baseUrl;
    }

    setLocation(location: string) {
        this.location = location;
    }

    getLocation() {
        return this.location;
    }
    getNavbarLoad() {
        let loadStatus = this.initialNavbarLoad;
        this.initialNavbarLoad = false;
        return loadStatus;
    }
    setNavbarLoad(value:any) {
        this.initialNavbarLoad = value;
    }
    setUnreadCount(count:number) {
        this.unreadMessageCount = count;
    }

    getUnreadCount() {
     return this.unreadMessageCount;
    }

    doctorAddedToGroup(groupInfo:Object) {
        this.doctorAddedGroupId = groupInfo;
    }
    getdoctorAddedGroup() {
        return this.doctorAddedGroupId;
    }
    playsound() {
    try {
        let audio = new Audio('https://instaud.io/_/2VGc.mp3');
        audio.play();
    } catch(e) {
        console.info('Failed to play audio');
        console.log(e);
    }
    }
    setSpeciality(speciality: string) {
        this.speciality = speciality;
    }

    getSpeciality() {
        return this.speciality;
    }

    setGroup(group: Group) {
        this.group = group;
    }

    getGroup() {
        return this.group;
    }

    getSpecialities(): Observable<any> {
        const uri = `${this.url}/specialities`;
        return this.http.get(uri)
            .map(res => res.json());
    }

    getLocations(): Observable<any> {
        const uri = `${this.url}/locations`;
        return this.http.get(uri)
            .map(res => res.json());
    }

    getAllergies(): Observable<any> {
        const uri = `${this.url}/allergies`;
        return this.http.get(uri)
            .map(res => res.json());
    }

    getLanguages(): Observable<any> {
        const uri = `${this.url}/languages`;
        return this.http.get(uri)
            .map(res => res.json());
    }

    getConsultationModes(): Observable<any> {
        const uri = `${this.url}/consultationmodes`;
        return this.http.get(uri)
            .map(res => res.json());
    }

    getQualifications(): Observable<any> {
        const uri = `${this.url}/qualifications`;
        return this.http.get(uri)
            .map(res => res.json());
    }

    getDoctors(userId:number, location: string, speciality: string, gps: number, time: string, page: number,
         size: number): Observable<any> {
        const uri1 = `${this.url}/doctors/schedules?`;
        const uri2 = `userId=${userId}&location=${location}&speciality=${speciality}&gps=${gps}&current_time=${time}&page=${page}
        &size=${size}`;
        const uri = uri1 + uri2;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.get(uri, { headers: headers })
            .map(res => res.json());
    }

    consultNow(doctorId: number, patientId: number) {
        const uri = `${this.url}/groups/doctors/${doctorId}/patients/${patientId}`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.get(uri, { headers: headers })
            .map(res => res.json());
    }

    //get all the doctor media information
    getDoctorMedia(userId: number) {
        const uri = `${this.url}/doctors/${userId}/bio`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.get(uri, { headers: headers })
            .map(res => res.json());
    }

    //get all the doctor store information
    getDoctorStore(userId: number) {
        const uri = `${this.url}/doctors/${userId}/bio/extra`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.get(uri, { headers: headers })
            .map(res => res.json());
    }

    //get the doctor_schedule by using doctorId
    getDoctorScheduleByDoctorId(doctorId: number) {
        const uri = `${this.url}/doctors/${doctorId}/schedules`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.get(uri, { headers: headers })
            .map(res => res.json());
    }

    updateStatus(status: string, doctorId: number): Observable<any> {
        const uri = `${this.url}/doctors/${doctorId}/schedules/status`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http
            .put(uri, { status: status }, { headers: headers })
            .map(response => {
                response.json();
            })
            .catch(this.handleError);
    }

    getDoctorById(doctorId: number) {
        const uri = `${this.url}/doctors/${doctorId}`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.get(uri, { headers: headers })
            .map(res => res.json());
    }

    //get all activities for a doctor
    getActivities(doctorId: number) {
        const uri = `${this.url}/doctors/${doctorId}/activities`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.get(uri, { headers: headers })
            .map(res => res.json());
    }

    //get all reviews for a doctor
    getReviews(doctorId: number) {
        const uri = `${this.url}/doctors/${doctorId}/reviews`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.get(uri, { headers: headers })
            .map(res => res.json());
    }

    //get visitor details
    getVisitor(visitorId: number) {
        const uri = `${this.url}/patients/${visitorId}`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.get(uri, { headers: headers })
            .map(res => res.json());
    }

    //get visitor store
    getVisitorStore(visitorId: number) {
        const uri = `${this.url}/visitors/${visitorId}/store`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.get(uri, { headers: headers })
            .map(res => res.json());
    }

    //get visitor report
    getVisitorReport(visitorId: number) {
        const uri = `${this.url}/visitors/${visitorId}/reports`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.get(uri, { headers: headers })
            .map(res => res.json());
    }

    //get visitor health
    getVisitorHealth(visitorId: number) {
        const uri = `${this.url}/visitors/${visitorId}/health`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.get(uri, { headers: headers })
            .map(res => res.json());
    }

    //get visitor prescription
    getVisitorPrescription(visitorId: number) {
        const uri = `${this.url}/visitors/${visitorId}/prescriptions`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.get(uri, { headers: headers })
            .map(res => res.json());
    }

    /* API related to chart */
    getVisitorAppointmentHistory(visitorId: number) {
        const uri = `${this.url}/visitors/${visitorId}/appointments/history`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.get(uri, { headers: headers })
            .map(res => res.json());
    }

    /* API related to visitorTimeline */
    getTimeline(visitorId: number) {
        const uri = `${this.url}/visitors/${visitorId}/timeline`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.get(uri, { headers: headers })
            .map(res => res.json());
    }

    /**
     * create visitor report
     */
    createVisitorReport(report: any): Observable<any> {
        const uri = `${this.url}/visitors/reports`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.post(uri, report, { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);
    }

    /*
    * returns notifications based on userId
    * @param {number} userId
    * @returns
    * @memberof SharedService
    */
    getNotificationsByUserId(userId: number, page: number, size: number) {
        const uri = `${this.url}/notifications/users/${userId}?page=${page}&size=${size}`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.get(uri, { headers: headers })
            .map(res => res.json());
    }

    getConsultationsByDoctorId(doctorId: number, page: number, size: number) {
        const uri = `${this.url}/appointments/doctors/${doctorId}?page=${page}&size=${size}`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.get(uri, { headers: headers })
            .map(res => res.json());
    }

    getConsultationsByVisitorId(visitorId: number, page: number, size: number) {
        const uri = `${this.url}/visitors/${visitorId}/consultations?page=${page}&size=${size}`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.get(uri, { headers: headers })
            .map(res => res.json());
    }

    getConsultationsByConsultationId(consultationId: number, doctorId:number) {
        const uri = `${this.url}/doctors/${doctorId}/consultations/${consultationId}`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.get(uri, { headers: headers })
            .map(res => res.json());
    }

    /**
     * all consultations by doctor id
     * @param visitorId
     * @param page
     * @param size
     */
    getAllConsultationsByDoctorId(doctorId: number, page: number, size: number) {
        const uri = `${this.url}/doctors/${doctorId}/consultations?page=${page}&size=${size}`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.get(uri, { headers: headers })
            .map(res => res.json());
    }

    sendOtp(mobileNo: number) {
        const uri = `${this.url}/send/otp/mobile/${mobileNo}`;
        return this.http.get(uri)
            .map(res => res.json());
    }

    resendOtp(mobileNo: number) {
        const uri = `${this.url}/resend/otp/mobile/${mobileNo}`;
        return this.http.get(uri)
            .map(res => res.json());
    }

    verifyOtp(mobileNo: number, otp: number) {
        const uri = `${this.url}/verify/mobile/${mobileNo}/otp/${otp}`;
        return this.http.get(uri)
            .map(res => res.json());
    }

    /**
     *
     * @param doctorId consultation history
     */
    getConsutationDetails(doctorId: number) {
        const uri = `${this.url}/doctors/${doctorId}/history`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.get(uri, { headers: headers })
            .map(res => res.json());
    }

    /**
     *
     * Call to the payment gateway
     * @param {*} data
     * @returns {*}
     * @memberof SharedService
     */
    paymentGatewayCall(data: any): any {
        const uri = `${this.url}/payments/requests`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.post(uri, data, { headers: headers })
            .map(res => res);
    }

    /**
     * get all bills
     */
    getBills(visitorId: number, page:number) {
        const uri = `${this.url}/billing/visitors/${visitorId}?page=${page}`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.get(uri, { headers: headers })
            .map(res => res.json());
    }


    /**
     * get bill by billid
     */
    getBillById(visitorId: number, billId: number) {
        const uri = `${this.url}/billing/visitors/${visitorId}/bill/${billId}`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.get(uri, { headers: headers })
            .map(res => res.json());
    }
    /**
     * @param doctorId get all bills
     */
    getBillsByDoctorId(doctorId: number, page:number) {
        const uri = `${this.url}/billing/doctors/${doctorId}?page=${page}`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.get(uri, { headers: headers })
            .map(res => res.json());
    }

    /**
     * create audit for audio/video calls at the time of appear message component
     */
    createAudit(audit: any) {
        const uri = `${this.url}/audit`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.post(uri, audit, { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);
    }

    validateFileUpload(file:string,type:string) {
        var response:any =  {'type':null,'message':null,'error':null};
        if(type==='image') {
            let regexMatch = file.match(/[a-z0-9A-Z_]*\.(jpeg|png|jpg)$/);
            if(regexMatch) {
                response.message = 'Success';
                return response;
            } else {
                response.error = 'Failed only jpeg and png are supported';
                return response;
            }
        }
        if(type==='video') {
            let regexMatch = file.match(/[a-z0-9A-Z_]*\.(mp4|avi)$/);
            if(regexMatch) {
                response.message = 'Success';
                return response;
            } else {
                response.error = 'Failed only mp4 video format is supported';
                return response;
            }
        }
        if(type==='file') {
            let regexMatch = file.match(/[a-z0-9A-Z_]*\.(pdf)$/);
            if(regexMatch) {
                response.message = 'Success';
                return response;
            } else {
                response.error = 'Failed only PDF files are supported';
                return response;
            }
        }
    }

    /**
     * create prescription info
     */
    updatePrescription(prescription: any) {
        const uri = `${this.url}/visitors/prescriptions`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.put(uri, prescription, { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);
    }

    setWindowVisibility(visibility:Boolean) {
        this.windowNotVisible = visibility;
    }

    // crate web notification
    createWebNotification(title:string,body:string) {
    console.log('Called create web notification');
    let document:any  = window.document;
    if(document.hidden === true || document.msHidden === true || document.webkitHidden === true) {
        this.windowNotInFocus = true;
    } else {
        this.windowNotInFocus = false;
    }
    if(this.windowNotInFocus || this.windowNotVisible) {
        this.playsound();
        let webNotification = (window as any).Notification;
        if (webNotification.permission !== 'denied') {
            console.log('Created web notification');
            let notification = new webNotification(title, {
                icon: 'assets/logo/web_notification_logo.png',
                body: body,
            });
            notification.onclick = ()=> { window.focus(); };
            // notification.onshow = ()=> {console.log('showed');};
            // notification.onclose = ()=> {console.log('closed');};
            notification.onerror = ()=> {console.warn('Error in creating WebNotification');};
          }
    }
}

    /**
     * sendMail to the admin and the visitor
     */
    sendMail(contactInfo: any) {
        const uri = `${this.url}/contacts/email`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.post(uri, contactInfo, { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);
    }

    /**
     * job application email
     */
    careerMail(userDetails: any) {
        const uri = `${this.url}/careers/email`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.post(uri, userDetails, { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);
    }

    /**
     * get report by report id
     */
    getReportById(reportId: number) {
        const uri = `${this.url}/reports/${reportId}`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        return this.http.get(uri, { headers: headers })
            .map(res => res.json());
    }

    //for reports
    uploadReportsFile(file: File): Observable<any> {
        const uri = `${this.url}/file/reports`;
        let headers = new Headers();
        headers.append('Authorization', `${this.securityService.key} ${this.securityService.getCookie('token')}`);
        let formData = new FormData();
        formData.append('file', file);
        return this.http.post(uri, formData, { headers: headers })
            .map((res: Response) => res)
            .catch(this.handleError);
    }

    private handleError(error: any): Observable<any> {
        return Observable.throw(error.message || error);
    }
}
