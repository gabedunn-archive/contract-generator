/*
 * Gabe Dunn 2019
 * Generates a contract to use for development projects.
 * Inspired by and adopted from the contact at these links:
 * https://stuffandnonsense.co.uk/projects/contract-killer/
 * https://www.docracy.com/sign/usedoc?signing=true&docId=0kpa5hfcobb&versionNum=2
 */

import json2md from 'json2md'
import { join } from 'path'
import { writeFileSync } from 'fs'

import { me, client, project, capitalize } from './constants'

// Generate some constants.
const exportDirectory = join(__dirname, '..')
const exportFile = join(exportDirectory, 'Contract.md')
// Payments variables.
const allCosts = project.phases.map(phase => phase.cost)
const totalCost = allCosts.reduce((prev, curr) => prev + curr, 0)

// The title variables.
const title = `${capitalize(project.type)} Development Contract.`
const subtitle = `**Between** ${me.name}\n\n` +
  `**And** ${client.company}`

// The summary paragraphs.
const summaryParagraphs = [
  'I will always do my best to fulfil your needs and meet your expectations, but it\'s important to have things ' +
  'written down so that we both know what is what, who should do what and what happens if something goes wrong. In ' +
  'this contract you won\'t find any complicated legal terms or large passages of unreadable text. I have no desire ' +
  'to trick you into signing something that you might later regret. What I do want is what\'s best for both parties, ' +
  'now and in the future.',
  'So, in short;',
  `You (${client.company}), located at ${client.address} ("you", "client"), represented by ${client.contact}, are ` +
  `hiring me (${me.name}) ("I", "me", "developer", or "${me.company}") to:`,
]
const summaryParagraphs2 = [
  `For the estimated total price of $${totalCost} ${project.currency} as outlined in our previous correspondence.`,
  'Of course it\'s a little more complicated, but we\'ll get to that.'
]

// The agreements variables.
const clientAgreements = [
  'That you have the authority to enter into this contract on behalf of yourself, your company, or your organization.',
  'To provide me with the assets and information I tell you I will need to complete the project.',
  'To do this when I ask and provide it in the formats I ask for.',
  'To review my work, provide feedback, and approval in a timely manner too.',
  'To be bound by any dates that we set together.',
  'To stick to the payment schedule set out at the end of this contract.'
]
const developerAgreements = [
  'That I have the experience and ability to perform the services that we have agreed upon.',
  'To carry out this all in a professional and timely manner.',
  'To endeavor to meet every deadline that\'s set.',
  'To respect the confidentiality of any information that you give me.'
]

// Details variables.
const detailsParagraphs = [
  '**Design**',
  'I create designs that adapt to the capabilities of many devices and screen sizes. I create them iteratively and ' +
  'use predominantly HTML, CSS, and JS so I won\'t waste time mocking up every template as a static visual. I may ' +
  'use visuals to indicate a creative direction (colour, texture, and typography).',
  'You\'ll have plenty of opportunities to review my work and provide feedback. I\'ll either share a Dropbox folder, ' +
  'Google Drive folder, or GitHub repository or development site with you and we\'ll have regular contact by either ' +
  'email or Discord.',
  'If - at any stage - you change your mind about what you want delivered or aren\'t happy with the direction my ' +
  'work is going, you\'ll pay me in accordance with the termination section, and may terminate this contract.',
  '**Text Content**',
  'Unless agreed upon separately, I\'m not responsible for inputting text or images into your content management ' +
  `system or or creating every page in your ${project.type} application. I can provide outsourced professional ` +
  'copy writing and editing services, so if you\'d like that, I can provide a separate estimate.',
  '**Graphics and Photographs**',
  'You should supply graphic files in in an editable, vector digital format. You should supply photographs in a high ' +
  'resolution (preferably original size) digital format. If you choose to buy stock photographs, I can suggest stock ' +
  'libraries. If you\'d like me to search for photographs for you, I can provide a separate estimate.',
  '**HTML, CSS, and JS**',
  'I deliver pages in HTML for markup, CSS stylesheets for styling, and unobtrusive JS for behaviors and the ' +
  'framework.',
  '**Browser Testing**',
  'Browser testing no longer means attempting to make a website look the same in browsers of different ' +
  'capabilities or on devices with different size screens. It does mean ensuring that a person\'s experience of a ' +
  'design should be appropriate to the capabilities of a browser or device.',
  'I test my work in current versions of major desktop browsers including those made by Google (Chrome/Chromium), ' +
  'Mozilla (Firefox), and Vivaldi. I won\'t test in older or "problem browsers" such as Microsoft\'s Internet ' +
  'Explorer and Edge. If you need an enhanced design for an older or "problem browser", I can provide a separate ' +
  'estimate for that.',
  '**Mobile Browser Testing**',
  'Testing using popular smaller screen devices is essential in ensuring that a person\'s experience of a design is ' +
  'appropriate to the capabilities of the device they\'re using. I test my designs in Google Chrome on the latest ' +
  'version of android, and can additionally test with Safari and Google Chrome on the latest version of iOS.',
  'I won\'t test in Opera Mini/Mobile, specific android devices, or other mobile browsers unless we agreed ' +
  'separately. If you need me to test using these, I can provide a separate estimate.',
  '**Technical Support**',
  'I\'m not a web hosting company so I don\'t offer support for web hosting, email, or other services relating to ' +
  'hosting. You may already have professional hosting and you might even manage that hosting in-house; if you do, ' +
  'great. If you don\'t, I can recommend one of my preferred hosting providers. I can even set if your site on a ' +
  'server, plus any statistics software such as Google Analytics and will provide a separate estimate for that. ' +
  'Then, the updates to, and management of that server will be up to you. I can provide the said updates and ' +
  'management, and for that will provide a separate estimate.',
  '**Search Engine Optimization (SEO)**',
  'I don\'t guarantee improvements to your website\'s search engine ranking, but the pages that I develop are ' +
  'accessible to and indexable by search engines.',
  '**Changes and Revisions**',
  'After each phase of development, I will send the current project to you for reviewal. You agree to get back to me ' +
  `within ${me.feedbackDays} days. If not, the phase with be satisfactorily completed.`,
  'I don\'t want to limit your ability to change your mind. The price at the beginning (and end) of this contract is ' +
  'based on the amount of time that I estimate I\'ll need to accomplish everything you\'ve told us you want to ' +
  'achieve, but I\'m happy to be flexible. If you want to change your mind or add anything new, that won\'t be a ' +
  'problem as I\'ll just provide a separate estimate for the additional time. To make changes, you must bring them ' +
  'up during the review of each phase of the project, or at the final review.'
]

// Cancelling variables.
const clientCancellation = [
  'I will retain your down payment.',
  'I will retain the payments for each of the completed phases.',
  'If I am working on a phase that has not yet been completed, that phase will be considered completed and as such I ' +
  'will receive full payment for it as a "kill fee".',
  'The "kill fee" will be considered the final payment for the project.'
]
const developerCancellation = [
  'I will retain your down payment.',
  'I will retain the payments for each of the completed phases.',
  'If I am working on a phase that has not yet been completed, that phase will be disregarded, and as such you will ' +
  'not be required to pay for any work done on that phase.',
  'The payment for the last completed phase will be considered the final payment for the project.'
]

// Legal variables.
const legalParagraphs = [
  'I will carry out my work in accordance with good industry practice and at the standard expected from a suitably ' +
  'qualified person with relevant experience. That said, I can\'t guarantee that my work will be error-free, and so ' +
  'I can\'t be liable to your or any third party for any damages including lost profits, lost savings, or other ' +
  'incidental, consequential, or special damages, even if I\'ve been advised of them.',
  'Your liability to me will also be limited to the amount of fees payable under this contract and you won\'t be ' +
  'liable to me or any third party for any damages, including lost profits, lost savings, or other incidental, ' +
  'consequential, of special damages, even if we\'ve advised you of them.',
  'You expressly acknowledge that although you are free to engage others to perform services of the same or similar ' +
  'nature to those provided by me. I must be notified of such engagements, and in the occurrence of an engagement ' +
  'of this nature I retain the right to terminate my involvement in the project and consider it equivalent to - ' +
  'under the terms of this contract - you cancelling the agreement, and as such I will retain the right to receive ' +
  'the same "kill fee" referred to in the previous cancellation section. Additionally, I shall be entitled to offer ' +
  'and provide my services to others, solicit other clients, and otherwise advertise the services offered by me.',
  'Finally, if any provision of this contract shall be unlawful, void, or for any reason unenforceable, then that ' +
  'provision shall be deemed severable from this contract amd shall not affect the validity and enforceability of ' +
  'any remaining provisions.',
]

// Copyright variables.
const copyrightParagraphs = [
  'Just to be clear, "Intellectual property rights" means all patents, rights to inventions, copyright, (including ' +
  'rights in software), and related rights, trademarks, service marks, get up and trade names, internet domain ' +
  'names, rights to goodwill or to sue for passing off, rights in designs, database rights, rights in confidential ' +
  'information, (including know-how), and any other intellectual property rights, in each case whether registered or ' +
  'unregistered and including all applications (or rights to apply) for, and renewals or extensions of such, and all ' +
  'similar or equivalent rights or forms of protection which subsist or shall subsist now or in the future in any ' +
  'part of the world.',
  'First, you guarantee that all elements of text, images, other artwork that you provide are either owned by your ' +
  'good selves, or that you\'ve permission to use them. When you provide text, images, or other artwork to us, you ' +
  'agree to protect me from any claim by a third party that I\'m using their intellectual property.',
  'I guarantee that all elements of the work I deliver to you are either owned by me or I\'ve obtained permission to ' +
  'provide them to you.',
  'By default, all intellectual properties are solely owned by me, and will only be assigned to you upon the ' +
  'final payment for the project. They will be assigned as follows:',
  'You\'ll own the website I design for you plus the visual elements that I create for it. I\'ll give you the source ' +
  'files and finished files and you should keep them somewhere safe as I\'m not required to keep a copy. You own all ' +
  'intellectual property rights of text, images, site specification, and data your provided, unless someone else ' +
  'them.',
  'I\'ll own any intellectual property rights I\'ve developed prior to, or developed separately from this project ' +
  'and not paid for by you. I\'ll own the unique combination of these elements that constitutes a complete design ' +
  'and I\'ll license its use to you, exclusively and in perpetuity for this project only, unless we agree otherwise.',
  'In the event of the termination of this Agreement, the payment for the last complete phase will be considered the ' +
  `final payment, and you will receive the agreed upon intellectual property rights for all of the completed ` +
  'phases.'
]
const displayParagraph = 'I love to show off my work, so I reserve the right to display all aspects of my creative ' +
  'work, including sketches, work-in-progress designs, and the completed project on my portfolio and in articles on ' +
  'websites, in magazine articles, and in books.'

// Phases variables.
const phasesMap = project.phases.slice(1).map(phase => {
  return [
    { h3: `Phase ${phase.phase}` },
    { blockquote: `Cost: $${phase.cost} ${project.currency}` },
    {
      ul: phase.elements.concat([
        'Feedback on phase.',
        'Testing of phase and integration with previous phases.',
        'Amendments.',
        'Testing of amendments.'
      ])
    }
  ]
}).concat([
  [
    { h3: 'Final Review & Amendments' },
    { blockquote: 'Cost: Subject to change based on changes & amendments.' },
    {
      ul: [
        'Feedback on entire project.',
        'Testing of entire project.',
        'Amendments.',
        'Final review and feedback.',
        'Approval.'
      ]
    }
  ]
])

// Payments variables.
const paymentsParagraphs = [
  'I am sure you understand how important it is for a small business such as myself that you pay the invoices that ' +
  'I send you promptly. As I\'m also sure you\'ll want to stay friends, you agree to stick tight to the following ' +
  'payment schedule.',
  `The total estimated cost of the project is \`$${totalCost} ${project.currency}\`.`,
  `I will invoice for an initial down payment of $${allCosts[0]} ${project.currency} once this agreement has been signed. ` +
  'I will start work after receiving this payment.',
  'I will invoice for the remaining balance(s) ' +
  `(${allCosts.slice(1).map(cost => `$${cost} ${project.currency}`).join(', ')}) after each of the respective phases ` +
  'are completed as described.',
  `I issue invoices electronically. My payment terms are ${me.paymentDueDate} days after the invoice is received by ` +
  `${me.paymentMethod}. All proposals are quoted in ${project.currency} and payments will be made at the equivalent ` +
  'conversion rate at the date the transfer is made.',
  'You agree to pay all charges associated with international transfers of funds. The appropriate bank account ' +
  'details will be provided either in the electronic invoice or in previous correspondence.',
  `I reserve the right to charge interest on all overdue debts at the rate of ${me.interest} per month or part of a ` +
  'month.'
]

// Small print variables.
const smallPrintParagraphs = [
  'Just like a parking ticket, neither of us can transfer this contract to anyone else without the other\'s ' +
  'permission.',
  'We both agree that we\'ll adhere to all relevant laws and regulations in relation to our activities under this ' +
  'contract and not to cause the other to breach any relevant laws or regulations.',
  'If under any circumstance either party is required to obtain legal counsel or services in order to enforce any ' +
  'part of this contract, the offending party will be required to reimburse all expenses made in effort to uphold ' +
  'these terms, including, but not limited to court fees, lawyer fees, and travel expenses related to this effort.',
  'This contract stays in place and need not be renewed. If for some reason one part of this contract becomes ' +
  'invalid or unenforceable, the remaining parts of it remain in place.',
  'Although the language is simple, the intentions are serious and this contract is a legal document under exclusive ' +
  `jurisdiction of ${me.jusisdiction}`
]

// Signature variables.
const clientSignature = `Signed by ${client.contact} on behalf of the client (${client.company}): \t\t_____________________`
const developerSignature = `Signed by ${me.name} on behalf of the developer (${me.company}): \t_____________________`
const date = `Date: \t\t\t\t\t\t\t\t\t\t_____________________`

const contractMarkdown = json2md([
  { h1: title },
  { blockquote: subtitle },
  { h2: 'Summary' },
  { p: summaryParagraphs },
  { ul: project.tasks },
  { p: summaryParagraphs2 },
  { h2: 'What Do Both Parties Agree To?' },
  { p: 'As my client, you agree:' },
  { ul: clientAgreements },
  { p: 'As the developer, I agree:' },
  { ul: developerAgreements },
  { h2: 'Getting Down to the Nitty Gritty' },
  { p: detailsParagraphs },
  { h2: 'Cancelling this Contract' },
  { p: 'If you wish to cancel this Agreement:' },
  { ul: clientCancellation },
  { p: 'If I wish to cancel this Agreement:' },
  { ul: developerCancellation },
  { h2: 'Legal Stuff' },
  { p: legalParagraphs },
  { h2: 'Intellectual Property Rights' },
  { p: copyrightParagraphs },
  { h2: 'Displaying my Work' },
  { p: displayParagraph },
  { h2: 'Project Phases' },
  phasesMap,
  { h2: 'Payments' },
  { p: paymentsParagraphs },
  { h2: 'But Where\'s All the Horrible Small Print?' },
  { p: smallPrintParagraphs },
  { h2: 'The Dotted Line' },
  { p: clientSignature },
  { p: developerSignature },
  { p: date },
  { p: 'Everyone should sign above and keep at least one copy for their own records.' }
], '')

console.log(contractMarkdown)

writeFileSync(exportFile, contractMarkdown, 'utf8')
