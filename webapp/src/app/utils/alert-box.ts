import { Injectable } from '@angular/core'
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root',
})
export class AlertBox {
  constructor(private toastr: ToastrService) {}

  public success(title, content) {
    this.toastr.success(content, title)
  }

  public error(title, content) {
    this.toastr.error(content, title)
  }

  public info(title, content) {
    this.toastr.info(content, title)
  }

  public warning(title, content) {
    this.toastr.warning(content, title)
  }
}
