import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable()
export class ConfirmDialogService {
    dialogRef: MatDialogRef<ConfirmDialogComponent> | any;

    constructor(private dialog: MatDialog) { }

    public open(options: IData) {
        this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: options.title,
                message: options.message,
                cancelText: options.cancelText,
                confirmText: options.confirmText,
                oneButton: options.oneButton
            }
        });
    }

    public confirmed(): Observable<any> {
        return this.dialogRef.afterClosed().pipe(take(1), map(res => {
            return res;
        }
        ));
    }
}

interface IData {
    title: string;
    message: string;
    cancelText?: string;
    confirmText: string;
    oneButton: boolean;
}