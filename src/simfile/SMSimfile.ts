import { SMTimingData } from './SMTimingData';
import type { SMBackgroundChange } from './SMBackgroundChange';
import type { SMSimfileRaw } from './SMSimfileRaw';
import type { SMSteps } from './SMSteps';

export class SMSimfile {
  public title?: string;
  public subtitle?: string;
  public artist?: string;
  public titleTranslit?: string;
  public subtitleTranslit?: string;
  public artistTranslit?: string;
  public genre?: string;
  public credit?: string;
  public banner?: string;
  public background?: string;
  public lyricsPath?: string;
  public cdTitle?: string;
  public music?: string;
  public sampleStart?: number;
  public sampleLength?: number;
  public selectable?: 'yes' | 'no' | 'roulette';
  public displayBPM?: number | [ number, number ] | '*';
  public notes: SMSteps[];
  public timingData: SMTimingData;
  public bgChanges?: SMBackgroundChange[];
  public fgChanges?: SMBackgroundChange[];

  /**
   * Itself but in a raw form.
   */
  public get raw(): SMSimfileRaw {
    const raw: SMSimfileRaw = {
      notes: JSON.parse( JSON.stringify( this.notes ) ),
      timingData: this.timingData.raw,
    };

    this.title && ( raw.title = this.title );
    this.subtitle && ( raw.subtitle = this.subtitle );
    this.artist && ( raw.artist = this.artist );
    this.titleTranslit && ( raw.titleTranslit = this.titleTranslit );
    this.subtitleTranslit && ( raw.subtitleTranslit = this.subtitleTranslit );
    this.artistTranslit && ( raw.artistTranslit = this.artistTranslit );
    this.genre && ( raw.genre = this.genre );
    this.credit && ( raw.credit = this.credit );
    this.banner && ( raw.banner = this.banner );
    this.background && ( raw.background = this.background );
    this.lyricsPath && ( raw.lyricsPath = this.lyricsPath );
    this.cdTitle && ( raw.cdTitle = this.cdTitle );
    this.music && ( raw.music = this.music );
    ( this.sampleStart != null ) && ( raw.sampleStart = this.sampleStart );
    ( this.sampleLength != null ) && ( raw.sampleLength = this.sampleLength );
    this.selectable && ( raw.selectable = this.selectable );
    ( this.displayBPM != null )
      && ( raw.displayBPM = JSON.parse( JSON.stringify( this.displayBPM ) ) );
    this.bgChanges && ( raw.bgChanges = JSON.parse( JSON.stringify( this.bgChanges ) ) );
    this.fgChanges && ( raw.fgChanges = JSON.parse( JSON.stringify( this.fgChanges ) ) );

    return raw;
  }

  public constructor() {
    this.notes = [];
    this.timingData = new SMTimingData();
  }

  /**
   * Create a new SMTimingData out of a raw value.
   *
   * @param raw A raw timing data
   */
  public static fromRaw( raw: SMSimfileRaw ): SMSimfile {
    const simfile = new SMSimfile();

    raw.title && ( simfile.title = raw.title );
    raw.subtitle && ( simfile.subtitle = raw.subtitle );
    raw.artist && ( simfile.artist = raw.artist );
    raw.titleTranslit && ( simfile.titleTranslit = raw.titleTranslit );
    raw.subtitleTranslit && ( simfile.subtitleTranslit = raw.subtitleTranslit );
    raw.artistTranslit && ( simfile.artistTranslit = raw.artistTranslit );
    raw.genre && ( simfile.genre = raw.genre );
    raw.credit && ( simfile.credit = raw.credit );
    raw.banner && ( simfile.banner = raw.banner );
    raw.background && ( simfile.background = raw.background );
    raw.lyricsPath && ( simfile.lyricsPath = raw.lyricsPath );
    raw.cdTitle && ( simfile.cdTitle = raw.cdTitle );
    raw.music && ( simfile.music = raw.music );
    ( raw.sampleStart != null ) && ( simfile.sampleStart = raw.sampleStart );
    ( raw.sampleLength != null ) && ( simfile.sampleLength = raw.sampleLength );
    raw.selectable && ( simfile.selectable = raw.selectable );
    ( raw.displayBPM != null )
      && ( simfile.displayBPM = JSON.parse( JSON.stringify( raw.displayBPM ) ) );
    raw.bgChanges && ( simfile.bgChanges = JSON.parse( JSON.stringify( raw.bgChanges ) ) );
    raw.fgChanges && ( simfile.fgChanges = JSON.parse( JSON.stringify( raw.fgChanges ) ) );

    simfile.notes = JSON.parse( JSON.stringify( raw.notes ) );
    raw.timingData && ( simfile.timingData = SMTimingData.fromRaw( raw.timingData ) );

    return simfile;
  }
}
