import { NgModule } from '@angular/core';
import { ToNumberPipe } from './to-number';
import { OptionName } from './option-name';

@NgModule({
    declarations: [
        ToNumberPipe,
        OptionName
    ],
    exports: [
        ToNumberPipe,
        OptionName
    ]
})
export class AppPipeModule { }
