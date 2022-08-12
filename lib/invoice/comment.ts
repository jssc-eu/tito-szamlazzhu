import getTaxComment from 'lib/tax/comment';
import dedent from 'dedent';
export default function invoiceComment(comment = '', partner, items): string {
  return dedent`
    ${comment}

    ${getTaxComment(partner, items)}
  `;
}
