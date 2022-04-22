import { parseSMSimfile } from '../parseSMSimfile';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import type { SMSimfileRaw } from '../SMSimfileRaw';

describe( 'parseSMSimfile', () => {
  it( 'parses brain power', () => {
    const smpath = resolve( __dirname, 'fixtures/steps.sm' );
    const sm = readFileSync( smpath, { encoding: 'utf8' } );

    const expected: SMSimfileRaw = {
      title: 'Giant Steps',
      artist: 'John Coltrane',
      genre: 'ART CORE',
      credit: 'Frums',
      banner: 'banner.mp4',
      background: 'bg.png',
      music: 'music.ogg',
      sampleStart: 60.0,
      sampleLength: 10.0,
      selectable: 'yes',
      displayBPM: [ 100, 400 ],
      timingData: {
        bpmSegments: [
          [ 0, 100 ],
          [ 960, 400 ],
          [ 4032, 200 ],
          [ 4128, 400 ],
          [ 4896, 200 ],
          [ 4944, 400 ],
          [ 5472, 200 ],
          [ 5544, 400 ],
          [ 6360, 200 ],
          [ 6408, 400 ],
          [ 6840, 100 ],
          [ 7608, 200 ],
          [ 12918, 400 ],
          [ 18294, 100 ],
          [ 18486, 200 ],
          [ 18870, 400 ],
        ],
        stopSegments: [
          [ 12216, 2.4 ],
          [ 12582, 0.412 ],
        ],
        offset: 0.009,
      },
      bgChanges: [
        {
          startBeat: 0,
          rate: 1.0,
          def: {
            file1: 'background',
          },
        },
        {
          startBeat: 99999,
          rate: 1.0,
          def: {
            file1: '-nosongbg-',
          },
        },
      ],
      fgChanges: [
        {
          startBeat: 0,
          rate: 1.0,
          def: {
            file1: 'lua',
          },
        },
      ],
      notes: [
        {
          stepsType: 'dance-single',
          description: 'TaroNuke',
          difficulty: 'Challenge',
          meter: 18,
          radarValues: [ 0.123, 0.345, 0.567, 0.789, 0.000 ],
          noteData: [
            [
              [ 384, { type: 'tap' } ],
              [ 576, { type: 'hold', subType: 'hold', duration: 24 } ],
              [ 912, { type: 'mine' } ],
            ],
            [
              [ 432, { type: 'tap' } ],
              [ 624, { type: 'hold', subType: 'roll', duration: 24 } ],
              [ 912, { type: 'mine' } ],
            ],
            [
              [ 480, { type: 'tap' } ],
              [ 672, { type: 'hold', subType: 'hold', duration: 24 } ],
              [ 912, { type: 'mine' } ],
            ],
            [
              [ 528, { type: 'tap' } ],
              [ 720, { type: 'hold', subType: 'roll', duration: 24 } ],
              [ 912, { type: 'mine' } ],
            ],
          ]
        },
        {
          stepsType: 'dance-single',
          description: 'Slumpage',
          difficulty: 'Edit',
          meter: 22,
          radarValues: [ 0.114, 0.514, 0.191, 0.981, 0.000 ],
          noteData: [
            [
              [ 0, { type: 'mine' } ],
            ],
            [
              [ 0, { type: 'mine' } ],
            ],
            [
              [ 0, { type: 'mine' } ],
            ],
            [
              [ 0, { type: 'mine' } ],
            ],
          ]
        },
      ],
    };

    const subject = parseSMSimfile( sm );

    expect( subject.raw ).toEqual( expected );
  } );
} );
