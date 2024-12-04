/*
  The MIT License

  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import React, { useMemo } from 'react';
import {
  EnumCellProps,
  isEnumControl,
  RankedTester,
  rankWith,
} from '@jsonforms/core';
import {
  TranslateProps,
  withJsonFormsEnumCellProps,
  withTranslateProps,
} from '@jsonforms/react';
import { i18nDefaults, withVanillaEnumCellProps } from '../util';
import type { VanillaRendererProps } from '../index';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export const EnumCell = (
  props: EnumCellProps & VanillaRendererProps & TranslateProps
) => {
  const {
    data,
    className,
    id,
    enabled,
    schema,
    uischema,
    path,
    handleChange,
    options,
    t,
  } = props;
  const noneOptionLabel = useMemo(
    () => t('enum.none', i18nDefaults['enum.none'], { schema, uischema, path }),
    [t, schema, uischema, path]
  );
  return (
    <Select
      disabled={!enabled}
      value={data || ''}
      onValueChange={(ev) =>
        handleChange(
          path,
          ev
        )
      }
    >
      <SelectTrigger id={id} className={className} asChild>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {[
          <SelectItem value={''} key={'jsonforms.enum.none'}>
            {noneOptionLabel}
          </SelectItem>,
        ].concat(
          options.map((optionValue) => (
            <SelectItem
              value={optionValue.value}
              key={optionValue.value}
            />
          ))
        )}
      </SelectContent>
    </Select>
  );
};
/**
 * Default tester for enum controls.
 * @type {RankedTester}
 */
export const enumCellTester: RankedTester = rankWith(2, isEnumControl);

export default withJsonFormsEnumCellProps(
  withTranslateProps(withVanillaEnumCellProps(EnumCell))
);
