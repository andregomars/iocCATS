import { NgModule } from '@angular/core';
import { ToNumberPipe } from './to-number';
import { ToTimePipe } from './to-time';
import { OptionName } from './option-name';

@NgModule({
    declarations: [
        ToNumberPipe,
        ToTimePipe,
        OptionName
    ],
    exports: [
        ToNumberPipe,
        ToTimePipe,
        OptionName
    ]
})
export class AppPipeModule { }
