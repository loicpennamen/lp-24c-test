import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FilesListItem } from './files-list-item';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const meta: Meta<FilesListItem> = {
  title: 'FilesListItem',
  component: FilesListItem,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
      // declarations: [FilesListItem],
      // providers: [{ provide: NgbModal, useValue: mockNgbModal }],
    }),
  ],
};
export default meta;

type Story = StoryObj<FilesListItem>;

export const Primary: Story = {
  render: (args) => ({
    props: args,
    template: `
      <table class="table table-lg my-4">
        <thead class="table-light border-top border-bottom">
        <tr>
          <th>File</th>
          <th>Name</th>
          <th>Description</th>
          <th>Valid</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
          <tr app-files-list-item [file]="file"></tr>
        </tbody>
      </table>
    `,
  }),
  args: {
    file: {
      id: 1,
      name: 'example.json',
      description: 'Un fichier JSON d’exemple',
      isValid: true,
      filename: 'storybook-file.json',
    },
  },
};
