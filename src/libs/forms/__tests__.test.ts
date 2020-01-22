import { renderHook } from '@testing-library/react-hooks';
import useForm, { min, max, req, UseFormConfig } from '.';

describe('useForm() under tests', () => {
  const config: UseFormConfig = {
    username: { value: '' },
    email: { value: 'example1994@gmail.com', validators: [req] },
    password: { value: 'example1994@gmail.com', validators: [req, min(4), max(20)] }
  };

  test('should create inital state based on config', () => {
    const { result } = renderHook(() => useForm(config));
    const [fields] = result.current;

    expect(fields.username.value).toBe(config.username.value);
    expect(fields.email.value).toEqual(config.email.value);
    expect(fields.password.value).toBe(config.password.value);
  });
});

// fdescribe('useForm()', () => {
//   type MockFieldsConfig = 'username' | 'description' | 'label' | 'cost' | 'percentage';
//   let config: FieldsConfig<MockFieldsConfig>;

//   const getFieldObject = (fieldkey: MockFieldsConfig) => ({
//     fieldkey,
//     error: '',
//     value: ''
//   });

//   const getEventMock = (value: string, dataKey?: MockFieldsConfig) => ({
//     target: { value },
//     currentTarget: { getAttribute: () => dataKey }
//   });

//   beforeEach(() => {
//     config = {
//       username: {},
//       description: {},
//       label: {},
//       cost: {},
//       percentage: {}
//     };
//   });

//   test('should create initial state', () => {
//     const {
//       result: { current }
//     } = renderHook(() => useForm<MockFieldsConfig>(config, () => {}));

//     expect(current.state.errorsOccured).toBe(false);
//     expect(current.state.keys).toEqual(Object.keys(config));
//     expect(current.state.fields).toEqual({
//       username: getFieldObject('username'),
//       description: getFieldObject('description'),
//       label: getFieldObject('label'),
//       cost: getFieldObject('cost'),
//       percentage: getFieldObject('percentage')
//     } as FieldsState<MockFieldsConfig>);
//   });

//   test('should set dirty parameter as true by default', () => {
//     const {
//       result: { current }
//     } = renderHook(() => useForm<MockFieldsConfig>(config, () => {}));

//     expect(current.state.dirty).toBe(true);
//   });

//   test('should set dirty parameter as false if given ValidationStrategy is AfterSubmit', () => {
//     const {
//       result: { current }
//     } = renderHook(() =>
//       useForm<MockFieldsConfig>(config, () => {}, {}, ValidationStrategy.AfterSubmit)
//     );

//     expect(current.state.dirty).toBe(false);
//   });

//   test('should populate initial state with provided cached values', () => {
//     const cacheMock: Partial<FieldsValues<MockFieldsConfig>> = {
//       username: 'Piotr',
//       description: 'Example description',
//       cost: 3.43
//     };

//     const {
//       result: { current }
//     } = renderHook(() => useForm<MockFieldsConfig>(config, () => {}, cacheMock));

//     expect(current.state.fields.username.value).toEqual(cacheMock.username);
//     expect(current.state.fields.description.value).toEqual(cacheMock.description);
//     expect(current.state.fields.cost.value).toEqual(cacheMock.cost);
//     expect(current.state.fields.label.value).toBe('');
//     expect(current.state.fields.percentage.value).toBe('');
//   });

//   describe('handleTyping()', () => {
//     test('should set new value from event object is not passed', () => {
//       const { result } = renderHook(() => useForm<MockFieldsConfig>(config, () => {}));

//       act(() => {
//         try {
//           result.current.handleChange(null, 'username', 'exmaple-username');
//           expect(true).toBe(false);
//         } catch (e) {
//           expect(e.message).toEqual('Event object is required');
//         }
//       });
//     });

//     test('should throw error if data key is not passed in event object as dataKey parameter', () => {
//       const {
//         result: { current }
//       } = renderHook(() => useForm<MockFieldsConfig>(config, () => {}));

//       act(() => {
//         try {
//           current.handleChange(getEventMock('example-value'));
//           expect(true).toBe(false);
//         } catch (e) {
//           expect(e.message).toEqual('data-key attribute is missing in given template');
//         }
//       });
//     });

//     test('should set new value from directValue parameter', () => {
//       const mockName = 'example-name';
//       const { result } = renderHook(() => useForm<MockFieldsConfig>(config, () => {}));

//       act(() => {
//         result.current.handleChange(
//           getEventMock('example-2-username', 'username'),
//           'username',
//           mockName
//         );
//       });

//       expect(result.current.state.fields.username.value).toBe(mockName);
//     });

//     test('should set value based on key from directKey parameter', () => {
//       const mockName = 'example-name';
//       const { result } = renderHook(() => useForm<MockFieldsConfig>(config, () => {}));

//       act(() => {
//         result.current.handleChange({}, 'username', mockName);
//       });

//       expect(result.current.state.fields.username.value).toBe(mockName);
//     });

//     test('should set error based on given validators in config if form is dirty', () => {
//       const { result } = renderHook(() =>
//         useForm<MockFieldsConfig>(
//           {
//             ...config,
//             username: {
//               validate: (value, state) => {
//                 if (value.length === 0) {
//                   return 'Error';
//                 }

//                 return '';
//               }
//             }
//           },
//           () => {}
//         )
//       );

//       act(() => {
//         result.current.handleSubmit({ preventDefault: () => {} } as any);
//         result.current.handleChange({}, 'username', '');
//       });

//       expect(result.current.state.fields.username.error).toBe('Error');
//     });

//     test('should avoid validation if form is not dirty and validation strategy is AfterSubmit', () => {
//       const { result } = renderHook(() =>
//         useForm<MockFieldsConfig>(
//           {
//             ...config,
//             username: {
//               validate: (value, state) => {
//                 if (value.length === 0) {
//                   return 'Error';
//                 }

//                 return '';
//               }
//             }
//           },
//           () => {},
//           {},
//           ValidationStrategy.AfterSubmit
//         )
//       );

//       act(() => {
//         result.current.handleChange({}, 'username', '');
//       });

//       expect(result.current.state.fields.username.error).toBe('');
//     });

//     test('should set errors occured if form is dirty', () => {
//       const { result } = renderHook(() =>
//         useForm<MockFieldsConfig>(
//           {
//             ...config,
//             username: {
//               validate: (value, state) => {
//                 if (value.length === 1) {
//                   return 'Error';
//                 }

//                 return '';
//               }
//             }
//           },
//           () => {}
//         )
//       );

//       act(() => {
//         result.current.handleSubmit({ preventDefault: () => {} } as any);
//         result.current.handleChange({}, 'username', 's');
//       });

//       expect(result.current.state.fields.username.error).toBe('Error');
//       expect(result.current.state.errorsOccured).toBe(true);
//       expect(result.current.state.dirty).toBe(true);
//     });

//     test('should call validate method for connected field', () => {
//       const { result } = renderHook(() =>
//         useForm<MockFieldsConfig>(
//           {
//             ...config,
//             username: {
//               validate: (value, state) => {
//                 if (value.length === 1) {
//                   return 'Error';
//                 }

//                 return '';
//               }
//             },
//             description: {
//               validate: (value, state) => {
//                 if (value.length === 1) {
//                   return 'Error';
//                 }

//                 return '';
//               }
//             }
//           },
//           () => {},
//           { description: 's' }
//         )
//       );

//       act(() => {
//         result.current.handleSubmit({ preventDefault: () => {} } as any);
//         result.current.handleChange({}, 'username', 's');
//       });

//       expect(result.current.state.fields.username.error).toBe('Error');
//       expect(result.current.state.fields.description.error).toBe('Error');
//     });
//   });

//   describe('handleSubmit()', () => {
//     test('should set dirty attribute after submit', () => {
//       const { result } = renderHook(() => useForm<MockFieldsConfig>(config, () => {}));

//       act(() => {
//         result.current.handleSubmit({ preventDefault: () => {} } as any);
//       });

//       expect(result.current.state.dirty).toBe(true);
//     });

//     test('should set errorsOccured if errors will be detected', () => {
//       const { result } = renderHook(() =>
//         useForm<MockFieldsConfig>(
//           {
//             ...config,
//             username: {
//               validate: (v, s) => {
//                 if (v.length === 0) {
//                   return 'Username field is required';
//                 }
//                 return '';
//               }
//             }
//           },
//           () => {}
//         )
//       );

//       act(() => {
//         result.current.handleSubmit({ preventDefault: () => {} } as any);
//       });

//       expect(result.current.state.errorsOccured).toBe(true);
//     });

//     test('should call all validate methods and set errors', () => {
//       const { result } = renderHook(() =>
//         useForm<MockFieldsConfig>(
//           {
//             ...config,
//             username: {
//               validate: (v, s) => {
//                 if (v.length === 0) {
//                   return 'Username field is required';
//                 }
//                 return '';
//               }
//             }
//           },
//           () => {}
//         )
//       );

//       act(() => {
//         result.current.handleSubmit({ preventDefault: () => {} } as any);
//       });

//       expect(result.current.state.fields.username.error).toBe('Username field is required');
//     });

//     test('should call onSuccessSubmit callback if no errors detected', () => {
//       const { result } = renderHook(() =>
//         useForm<MockFieldsConfig>(config, values => {
//           expect(values).toEqual({
//             username: 's',
//             description: '',
//             cost: '',
//             label: '',
//             percentage: ''
//           } as FieldsValues<MockFieldsConfig>);
//         })
//       );

//       act(() => {
//         result.current.handleChange({}, 'username', 's');
//       });

//       act(() => {
//         result.current.handleSubmit({ preventDefault: () => {} } as any);
//       });

//       expect(result.current.state.errorsOccured).toBe(false);
//     });
//   });
// });
